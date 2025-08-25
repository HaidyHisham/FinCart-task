export type TCategory = { id: number; name: string; slug: string; image: string };
export type TProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: TCategory;
  images: string[];
};