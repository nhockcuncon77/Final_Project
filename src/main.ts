// Main application entry point
import { mockBooks } from './data.js';
import { initializeEventHandlers } from './events.js';
import { renderBookList, updateCartSummary } from './render.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('BookVerse application initialized');

  // Render initial book list
  const booksContainer = document.querySelector('.books-grid') as HTMLElement;
  if (booksContainer) {
    renderBookList(mockBooks, booksContainer);
  }

  // Initialize event handlers
  initializeEventHandlers();

  // Update cart summary on page load
  updateCartSummary();
});




