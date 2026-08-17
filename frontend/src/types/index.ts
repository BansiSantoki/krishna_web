export type MetalKey = 'gold24' | 'gold22' | 'gold18' | 'silver' | 'platinum';

export type Gender = 'women' | 'men' | 'kids' | 'unisex';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subCategory: string;
  images: string[];
  metal: MetalKey;
  metalLabel: string;
  purity: string;
  weight: number;
  stoneValue: number;
  stoneDetail?: string;
  makingPct: number;
  discountPct: number;
  rating: number;
  reviews: number;
  occasion: string[];
  gender: Gender;
  inStock: boolean;
  badge?: string;
  tags: Array<'bestseller' | 'trending' | 'new' | 'featured' | 'offer' | 'rentable'>;
  rentPerDay?: number;
  description: string;
  hallmark: string;
  certificate?: string;
  deliveryDays: number;
  has360: boolean;
  hasVideo: boolean;
}

export interface PriceBreakup {
  metalValue: number;
  stoneValue: number;
  making: number;
  gst: number;
  subtotal: number;
  total: number;
  mrp: number;
  savings: number;
}

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  blurb: string;
  subCategories: SubCategory[];
}

export interface CartLine {
  productId: string;
  quantity: number;
  size?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  photos: string[];
  helpful: number;
}