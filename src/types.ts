export interface Outfit {
  id: number;
  name: string;
  image: string;
  buyLink: string;
  description: string;
  category: string;
  color: string;
  price?: number;
}

export interface Filters {
  occasion: string;
  color: string;
}
