import type { Outfit } from '../types';
import { catalogByCategory } from '../data/fashionCatalog';


const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

interface ProductSearchParams {
  category: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}


export async function fetchAmazonProducts(params: ProductSearchParams): Promise<Outfit[]> {
  if (!RAPIDAPI_KEY) {
    console.warn('RapidAPI key not found, using mock data');
    return getMockProducts(params);
  }

  try {
    const searchQuery = buildSearchQuery(params);
    const response = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchQuery}&page=1&country=IN&sort_by=RELEVANCE&product_condition=ALL`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();
    return mapAmazonProducts(data.data.products || [], params.category);
  } catch (error) {
    console.error('Amazon API error:', error);
    return getMockProducts(params);
  }
}


export async function fetchMyntraProducts(params: ProductSearchParams): Promise<Outfit[]> {
  
  return getMockProducts(params);
}


export async function fetchHMProducts(params: ProductSearchParams): Promise<Outfit[]> {
  
  return getMockProducts(params);
}


export async function fetchAllProducts(params: ProductSearchParams): Promise<Outfit[]> {
  const [amazon, myntra, hm] = await Promise.all([
    fetchAmazonProducts(params),
    fetchMyntraProducts(params),
    fetchHMProducts(params)
  ]);

  return [...amazon, ...myntra, ...hm];
}


function buildSearchQuery(params: ProductSearchParams): string {
  const parts: string[] = [];
  
  if (params.color) parts.push(params.color);
  parts.push(getCategorySearchTerm(params.category));
  parts.push('women'); 
  return encodeURIComponent(parts.join(' '));
}


function getCategorySearchTerm(category: string): string {
  const mapping: Record<string, string> = {
    'top': 'tops shirts blouses',
    'bottoms': 'jeans pants skirts',
    'dress': 'dresses',
    'outerwear': 'jackets coats blazers',
    'footwear': 'shoes sneakers heels boots',
    'accessory': 'bags jewelry accessories'
  };
  return mapping[category] || category;
}


function mapAmazonProducts(products: any[], category: string): Outfit[] {
  return products.slice(0, 20).map((product, index) => ({
    id: Date.now() + index,
    name: product.product_title || 'Fashion Item',
    image: product.product_photo || product.product_main_image_url || '',
    buyLink: product.product_url || '#',
    description: product.product_description || 'Stylish fashion item',
    category: category,
    color: extractColorFromTitle(product.product_title) || 'multi',
    price: product.product_price || product.product_original_price
  }));
}


function extractColorFromTitle(title: string): string | null {
  const colors = ['black', 'white', 'red', 'blue', 'green', 'pink', 'yellow', 'purple', 'grey', 'brown'];
  const lowerTitle = title.toLowerCase();
  
  for (const color of colors) {
    if (lowerTitle.includes(color)) {
      return color;
    }
  }
  return null;
}


function getMockProducts(params: ProductSearchParams): Outfit[] {
  const categoryMap: Record<string, keyof typeof catalogByCategory> = {
    'top': 'tops',
    'bottoms': 'bottoms',
    'dress': 'dresses',
    'outerwear': 'outerwear',
    'footwear': 'footwear',
    'accessory': 'accessories'
  };
  
  const catalogKey = categoryMap[params.category];
  return catalogKey ? (catalogByCategory[catalogKey] || []) : [];
}


export async function searchProducts(
  category: string,
  color?: string,
  style?: string,
  limit: number = 50
): Promise<Outfit[]> {
  const params: ProductSearchParams = {
    category,
    color,
    limit
  };

  
  const products = await fetchAllProducts(params);

  
  let filtered = products;
  
  if (color && color !== 'multi') {
    filtered = filtered.filter(p => 
      p.color === color || p.color === 'multi' || p.color === 'white' || p.color === 'black'
    );
  }

  return filtered.slice(0, limit);
}


export async function getDynamicRecommendations(
  uploadedCategory: string,
  uploadedColor: string,
  pairingTypes: string[]
): Promise<Outfit[]> {
  const allProducts: Outfit[] = [];

  
  for (const pairingType of pairingTypes) {
    const products = await searchProducts(pairingType, undefined, undefined, 15);
    allProducts.push(...products);
  }

  return allProducts;
}
