import type { Product } from '@/types';

/** One craft group with the products that belong to it. */
export interface CraftOption {
  id: string;
  name: string;
  tagline: string;
  products: Product[];
}
