import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: 'rings' | 'earrings' | 'necklaces' | 'bracelets';
  images: string[];
  details: string[];
  heroImage: string;
}

export const productsData: Record<string, Product[]> = {
  rings: [
    { 
      id: 1, 
      name: 'Ethereal Band', 
      price: '$285', 
      heroImage: product1,
      description: 'A delicate band featuring a subtle rosegold finish, perfect for everyday elegance.',
      category: 'rings',
      images: [product1, product2, product3, product4],
      details: ['18K Rosegold', '2mm width', 'Handcrafted', 'Nickel-free', 'Hypoallergenic']
    },
    { 
      id: 2, 
      name: 'Signature Solitaire', 
      price: '$425', 
      heroImage: product2,
      description: 'A timeless solitaire ring featuring a brilliant cut stone set in warm rosegold.',
      category: 'rings',
      images: [product2, product1, product3, product4],
      details: ['18K Rosegold', '4mm center stone', 'Handcrafted', 'Conflict-free', 'Lifetime guarantee']
    },
    { 
      id: 3, 
      name: 'Radiant Halo', 
      price: '$395', 
      heroImage: product3,
      description: 'A radiant halo design that enhances the brilliance of the central gemstone.',
      category: 'rings',
      images: [product3, product1, product2, product4],
      details: ['White Sapphire', '18K Rosegold', 'Halo setting', 'Handcrafted', 'Gift box included']
    },
    { 
      id: 4, 
      name: 'Vintage Twist', 
      price: '$310', 
      heroImage: product4,
      description: 'An intricately twisted band that combines vintage charm with modern grace.',
      category: 'rings',
      images: [product4, product1, product2, product3],
      details: ['18K Yellow Gold', '3mm width', 'Handcrafted', 'Polished finish', 'Nickel-free']
    },
  ],
  earrings: [
    { 
      id: 5, 
      name: 'Pearl Drop', 
      price: '$245', 
      heroImage: product3,
      description: 'Elegant pearl drop earrings that add sophistication to any look.',
      category: 'earrings',
      images: [product3, product1, product2, product4],
      details: ['Freshwater pearls', '18K Rosegold', 'French wire', 'Hypoallergenic', 'Gift box included']
    },
    { 
      id: 6, 
      name: 'Radiant Hoops', 
      price: '$295', 
      heroImage: product1,
      description: 'Classic hoop earrings featuring a polished gold finish for a timeless appeal.',
      category: 'earrings',
      images: [product1, product2, product3, product4],
      details: ['18K Yellow Gold', '30mm diameter', 'Snap clasp', 'Lightweight', 'Handcrafted']
    },
    { 
      id: 7, 
      name: 'Diamond Studs', 
      price: '$375', 
      heroImage: product2,
      description: 'Sparkling diamond studs set in rose gold for a subtle yet luxurious touch.',
      category: 'earrings',
      images: [product2, product3, product4, product1],
      details: ['Lab-grown diamonds', '18K Rosegold', 'Butterfly back', 'Conflict-free', 'Polished finish']
    },
    { 
      id: 8, 
      name: 'Celestial Drops', 
      price: '$320', 
      heroImage: product4,
      description: 'Graceful drop earrings featuring celestial-inspired motifs and soft shimmer.',
      category: 'earrings',
      images: [product4, product2, product1, product3],
      details: ['Sterling Silver', 'Moon and star design', 'Handcrafted', 'Nickel-free', 'Gift-ready packaging']
    },
  ],
  necklaces: [
    { 
      id: 9, 
      name: 'Infinity Chain', 
      price: '$265', 
      heroImage: product1,
      description: 'A minimalist infinity pendant on a sleek chain, symbolizing endless elegance.',
      category: 'necklaces',
      images: [product1, product2, product3, product4],
      details: ['18K Rosegold', 'Adjustable 16–18 inch chain', 'Polished finish', 'Handcrafted', 'Gift box included']
    },
    { 
      id: 10, 
      name: 'Solstice Pendant', 
      price: '$335', 
      heroImage: product2,
      description: 'A radiant pendant inspired by the sun, bringing warmth and light to your style.',
      category: 'necklaces',
      images: [product2, product3, product4, product1],
      details: ['Gold-plated Sterling Silver', 'Lobster clasp', '18 inch chain', 'Polished surface', 'Handcrafted']
    },
    { 
      id: 11, 
      name: 'Luna Pearl Necklace', 
      price: '$420', 
      heroImage: product3,
      description: 'A string of freshwater pearls complemented by a subtle gold clasp.',
      category: 'necklaces',
      images: [product3, product1, product2, product4],
      details: ['Freshwater pearls', '18K Gold clasp', '17 inch length', 'Hand-knotted', 'Gift-ready']
    },
    { 
      id: 12, 
      name: 'Heart Charm Necklace', 
      price: '$295', 
      heroImage: product4,
      description: 'A charming heart pendant necklace representing love and grace.',
      category: 'necklaces',
      images: [product4, product3, product1, product2],
      details: ['Sterling Silver', '18 inch chain', 'Heart-shaped pendant', 'Polished finish', 'Handcrafted']
    },
  ],
  bracelets: [
    { 
      id: 13, 
      name: 'Classic Chain Bracelet', 
      price: '$210', 
      heroImage: product1,
      description: 'A sleek gold chain bracelet that pairs effortlessly with any outfit.',
      category: 'bracelets',
      images: [product1, product2, product3, product4],
      details: ['18K Gold-plated', '7-inch length', 'Lobster clasp', 'Nickel-free', 'Gift box included']
    },
    { 
      id: 14, 
      name: 'Charm Bangle', 
      price: '$265', 
      heroImage: product2,
      description: 'An elegant open bangle featuring dainty charm accents for everyday wear.',
      category: 'bracelets',
      images: [product2, product1, product3, product4],
      details: ['Sterling Silver', 'Adjustable size', 'Charm accents', 'Polished finish', 'Handcrafted']
    },
    { 
      id: 15, 
      name: 'Twist Cuff', 
      price: '$310', 
      heroImage: product3,
      description: 'A modern twist cuff bracelet designed for both strength and elegance.',
      category: 'bracelets',
      images: [product3, product2, product1, product4],
      details: ['18K Rosegold', 'Open-ended design', 'Adjustable fit', 'Hand-polished', 'Nickel-free']
    },
    { 
      id: 16, 
      name: 'Beaded Serenity', 
      price: '$195', 
      heroImage: product4,
      description: 'A calming beaded bracelet featuring natural stones for balance and beauty.',
      category: 'bracelets',
      images: [product4, product1, product2, product3],
      details: ['Natural gemstones', 'Elastic fit', 'Hand-strung', 'Nickel-free', 'Gift pouch included']
    },
  ],
};

// Helper function to find a product by ID and category
export const findProduct = (category: string, productId: number): Product | undefined => {
  const products = productsData[category];
  if (!products) return undefined;
  return products.find(p => p.id === productId);
};

// Helper function to get all products
export const getAllProducts = (): Product[] => {
  return Object.values(productsData).flat();
};
