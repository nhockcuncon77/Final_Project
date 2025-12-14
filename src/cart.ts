// Shopping cart management with localStorage
import { Product, CartItem } from './models.js';

const CART_STORAGE_KEY = 'bookverse_cart';

export function getCart(): CartItem[] {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartData) return [];
  
  try {
    return JSON.parse(cartData);
  } catch (error) {
    console.error('Error parsing cart data:', error);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart data:', error);
  }
}

export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
  updateCartUI();
}

export function removeFromCart(productId: string): void {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.product.id !== productId);
  saveCart(filteredCart);
  updateCartUI();
}

export function updateCartQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
    updateCartUI();
  }
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function clearCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartUI();
}

function updateCartUI(): void {
  // Dispatch custom event to update cart UI
  const event = new CustomEvent('cartUpdated', {
    detail: { itemCount: getCartItemCount(), total: getCartTotal() }
  });
  document.dispatchEvent(event);
}




