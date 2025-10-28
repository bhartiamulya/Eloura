import type { Outfit } from '../types';


const tops: Outfit[] = [
  { id: 101, name: 'White Basic T-Shirt', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0685816001.html', description: 'Essential white tee for everyday wear', category: 'top', color: 'white' },
  { id: 102, name: 'Black V-Neck Top', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', buyLink: 'https://www.myntra.com/tshirts/h-m/hm-women-black-solid-v-neck-t-shirt/11234567/buy', description: 'Flattering V-neck in classic black', category: 'top', color: 'black' },
  { id: 103, name: 'Striped Breton Top', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', buyLink: 'https://www.amazon.in/VERO-MODA-Womens-Regular-T-Shirt/dp/B07PQWXKFV', description: 'French-inspired striped tee', category: 'top', color: 'multi' },
  { id: 104, name: 'Silk Cream Blouse', image: 'https://images.unsplash.com/photo-1564257577-1f4d8b4f7f1b?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.1074402002.html', description: 'Elegant silk blouse for office wear', category: 'top', color: 'white' },
  { id: 105, name: 'Red Crop Top', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800', buyLink: 'https://www.myntra.com/tops/forever-21/forever-21-women-red-solid-crop-top/9876543/buy', description: 'Trendy crop top for casual outings', category: 'top', color: 'red' },
  { id: 106, name: 'Blue Denim Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', buyLink: 'https://www.amazon.in/Levi-Womens-Western-Shirt/dp/B08XYZABC1', description: 'Classic denim button-down', category: 'top', color: 'blue' },
  { id: 107, name: 'Green Sweater', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819003.html', description: 'Cozy knit sweater in forest green', category: 'top', color: 'green' },
  { id: 108, name: 'Pink Tank Top', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800', buyLink: 'https://www.myntra.com/tops/zara/zara-women-pink-tank-top/7654321/buy', description: 'Lightweight tank for summer', category: 'top', color: 'pink' },
  { id: 109, name: 'Black Turtleneck', image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800', buyLink: 'https://www.amazon.in/Uniqlo-Women-Heattech-Turtleneck/dp/B09ABCDEF1', description: 'Sleek turtleneck for layering', category: 'top', color: 'black' },
  { id: 110, name: 'White Button-Up Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0685816002.html', description: 'Crisp white shirt - wardrobe staple', category: 'top', color: 'white' },
];


const bottoms: Outfit[] = [
  { id: 201, name: 'Black Skinny Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800', buyLink: 'https://www.myntra.com/jeans/levis/levis-women-721-high-rise-skinny-fit-stretchable-jeans/1364628/buy', description: 'High-waist black skinny jeans', category: 'bottoms', color: 'black' },
  { id: 202, name: 'Blue Mom Jeans', image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800', buyLink: 'https://www.amazon.in/Levi-Womens-Mom-Jeans/dp/B08MOMJEAN1', description: 'Relaxed fit mom jeans', category: 'bottoms', color: 'blue' },
  { id: 203, name: 'White Wide-Leg Pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819004.html', description: 'Flowy wide-leg trousers', category: 'bottoms', color: 'white' },
  { id: 204, name: 'Pink Pleated Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0608945050.html', description: 'Feminine pleated midi skirt', category: 'bottoms', color: 'pink' },
  { id: 205, name: 'Black Mini Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', buyLink: 'https://www.myntra.com/skirts/forever-21/forever-21-women-black-mini-skirt/8765432/buy', description: 'Edgy black mini skirt', category: 'bottoms', color: 'black' },
  { id: 206, name: 'Denim Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', buyLink: 'https://www.amazon.in/Levi-Womens-Denim-Shorts/dp/B08SHORTS1', description: 'Classic denim cut-off shorts', category: 'bottoms', color: 'blue' },
  { id: 207, name: 'Green Cargo Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819005.html', description: 'Utility cargo pants', category: 'bottoms', color: 'green' },
  { id: 208, name: 'Black Leather Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', buyLink: 'https://www.myntra.com/skirts/zara/zara-women-black-leather-skirt/6543210/buy', description: 'Faux leather pencil skirt', category: 'bottoms', color: 'black' },
];


const dresses: Outfit[] = [
  { id: 301, name: 'Summer Floral Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', buyLink: 'https://www.myntra.com/dresses/sassafras/sassafras-women-red-floral-printed-fit-and-flare-dress/15503086/buy', description: 'Vibrant floral summer dress', category: 'dress', color: 'multi' },
  { id: 302, name: 'Little Black Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', buyLink: 'https://www.myntra.com/dresses/mango/mango-women-black-solid-bodycon-dress/12345678/buy', description: 'Classic LBD for any occasion', category: 'dress', color: 'black' },
  { id: 303, name: 'White Maxi Dress', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819002.html', description: 'Elegant white maxi dress', category: 'dress', color: 'white' },
  { id: 304, name: 'Red Cocktail Dress', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', buyLink: 'https://www.myntra.com/dresses/rare/rare-women-red-solid-bodycon-dress/14567890/buy', description: 'Bold red party dress', category: 'dress', color: 'red' },
  { id: 305, name: 'Blue Wrap Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', buyLink: 'https://www.amazon.in/Wrap-Dress-Blue/dp/B08WRAPDRS1', description: 'Flattering wrap dress in blue', category: 'dress', color: 'blue' },
  { id: 306, name: 'Green Midi Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819006.html', description: 'Chic green midi dress', category: 'dress', color: 'green' },
];


const outerwear: Outfit[] = [
  { id: 401, name: 'Classic Denim Jacket', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', buyLink: 'https://www.amazon.in/Levi-Womens-Original-Trucker-Jacket/dp/B07QQKJXRP', description: 'Timeless denim jacket', category: 'outerwear', color: 'blue' },
  { id: 402, name: 'Black Leather Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', buyLink: 'https://www.myntra.com/jackets/roadster/roadster-women-black-leather-jacket/3456789/buy', description: 'Edgy black leather jacket', category: 'outerwear', color: 'black' },
  { id: 403, name: 'Beige Trench Coat', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819007.html', description: 'Classic trench coat', category: 'outerwear', color: 'white' },
  { id: 404, name: 'Navy Blazer', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800', buyLink: 'https://www.amazon.in/Blazer-Navy-Women/dp/B08BLAZER1', description: 'Professional navy blazer', category: 'outerwear', color: 'blue' },
  { id: 405, name: 'Pink Cardigan', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', buyLink: 'https://www.myntra.com/cardigans/h-m/hm-women-pink-cardigan/5432109/buy', description: 'Soft pink knit cardigan', category: 'outerwear', color: 'pink' },
];


const footwear: Outfit[] = [
  { id: 501, name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', buyLink: 'https://www.amazon.in/Puma-Unisex-Adult-Sneakers-White-Black/dp/B0BZX8QFHZ', description: 'Classic white sneakers', category: 'footwear', color: 'white' },
  { id: 502, name: 'Black Ankle Boots', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', buyLink: 'https://www.myntra.com/casual-shoes/mast--harbour/mast--harbour-women-brown-solid-heeled-boots/11430826/buy', description: 'Versatile ankle boots', category: 'footwear', color: 'black' },
  { id: 503, name: 'Nude Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', buyLink: 'https://www.amazon.in/Heels-Nude-Women/dp/B08HEELS01', description: 'Elegant nude pumps', category: 'footwear', color: 'white' },
  { id: 504, name: 'Red Stilettos', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', buyLink: 'https://www.myntra.com/heels/inc-5/inc-5-women-red-stilettos/4321098/buy', description: 'Bold red high heels', category: 'footwear', color: 'red' },
  { id: 505, name: 'Brown Sandals', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819008.html', description: 'Casual brown sandals', category: 'footwear', color: 'multi' },
  { id: 506, name: 'Black Loafers', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800', buyLink: 'https://www.amazon.in/Loafers-Black-Women/dp/B08LOAFER1', description: 'Comfortable black loafers', category: 'footwear', color: 'black' },
];


const accessories: Outfit[] = [
  { id: 601, name: 'Leather Crossbody Bag', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb1c522?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819001.html', description: 'Elegant crossbody bag', category: 'accessory', color: 'black' },
  { id: 602, name: 'Gold Statement Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', buyLink: 'https://www.myntra.com/earrings/zaveri-pearls/zaveri-pearls-gold-plated-contemporary-drop-earrings/10339844/buy', description: 'Bold gold earrings', category: 'accessory', color: 'multi' },
  { id: 603, name: 'Black Tote Bag', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', buyLink: 'https://www.amazon.in/Tote-Bag-Black/dp/B08TOTEBAG', description: 'Spacious black tote', category: 'accessory', color: 'black' },
  { id: 604, name: 'Silver Necklace', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', buyLink: 'https://www.myntra.com/necklaces/accessorize/accessorize-silver-chain-necklace/2109876/buy', description: 'Delicate silver necklace', category: 'accessory', color: 'multi' },
  { id: 605, name: 'Brown Leather Belt', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800', buyLink: 'https://www2.hm.com/en_in/productpage.0970819009.html', description: 'Classic leather belt', category: 'accessory', color: 'multi' },
  { id: 606, name: 'Sunglasses - Black', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800', buyLink: 'https://www.amazon.in/Sunglasses-Black/dp/B08SUNGLS1', description: 'Trendy black sunglasses', category: 'accessory', color: 'black' },
  { id: 607, name: 'Beige Clutch', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800', buyLink: 'https://www.myntra.com/clutches/caprese/caprese-beige-clutch/1098765/buy', description: 'Elegant evening clutch', category: 'accessory', color: 'white' },
];


export const fashionCatalog: Outfit[] = [
  ...tops,
  ...bottoms,
  ...dresses,
  ...outerwear,
  ...footwear,
  ...accessories,
];


export const catalogByCategory = {
  tops,
  bottoms,
  dresses,
  outerwear,
  footwear,
  accessories,
};

export default fashionCatalog;
