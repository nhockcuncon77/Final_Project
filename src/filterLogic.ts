// Filter logic extracted for testing purposes
import { Product, FilterOptions } from './models.js';
import { mockBooks } from './data.js';

/**
 * Apply filters to the book list
 * @param books - Array of books to filter
 * @param filters - Filter options (searchQuery, genre, author)
 * @returns Filtered array of books
 */
export function applyFiltersLogic(books: Product[], filters: FilterOptions): Product[] {
  return books.filter(book => {
    // Search query filter
    if (filters.searchQuery) {
      const matchesTitle = book.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesAuthor = book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());
      if (!matchesTitle && !matchesAuthor) return false;
    }

    // Genre filter
    if (filters.genre) {
      if (book.genre !== filters.genre) return false;
    }

    // Author filter
    if (filters.author) {
      if (book.author !== filters.author) return false;
    }

    return true;
  });
}

/**
 * Get all unique genres from the book list
 */
export function getAllGenres(books: Product[]): string[] {
  return Array.from(new Set(books.map(book => book.genre))).sort();
}

/**
 * Get all unique authors from the book list
 */
export function getAllAuthors(books: Product[]): string[] {
  return Array.from(new Set(books.map(book => book.author))).sort();
}


