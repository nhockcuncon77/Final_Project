// TypeScript interfaces for data models

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Product {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  description: string;
  imageUrl: string;
  rating?: number;
  publishedYear?: number;
}

export interface FormData {
  name?: string;
  email: string;
  password?: string;
  searchQuery?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  genre?: string;
  author?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}




