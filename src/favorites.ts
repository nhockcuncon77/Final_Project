// Favorites management with localStorage
import { Product } from './models.js';

const FAVORITES_STORAGE_KEY = 'bookverse_favorites';

export function getFavorites(): string[] {
  const favoritesData = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!favoritesData) return [];
  
  try {
    return JSON.parse(favoritesData);
  } catch (error) {
    console.error('Error parsing favorites data:', error);
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites data:', error);
  }
}

export function addToFavorites(productId: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    saveFavorites(favorites);
    updateFavoritesUI();
  }
}

export function removeFromFavorites(productId: string): void {
  const favorites = getFavorites();
  const filteredFavorites = favorites.filter(id => id !== productId);
  saveFavorites(filteredFavorites);
  updateFavoritesUI();
}

export function isFavorite(productId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(productId);
}

export function toggleFavorite(productId: string): void {
  if (isFavorite(productId)) {
    removeFromFavorites(productId);
  } else {
    addToFavorites(productId);
  }
}

function updateFavoritesUI(): void {
  // Dispatch custom event to update favorites UI
  const event = new CustomEvent('favoritesUpdated');
  document.dispatchEvent(event);
}




