// Event handler functions
import { mockBooks, genres } from './data.js';
import { FilterOptions } from './models.js';
import { renderBookList, renderGenreFilter, showNotification, renderCartItems, updateCartSummary } from './render.js';
import { validateSearchQuery, sanitizeInput } from './validation.js';

let currentFilters: FilterOptions = {};
let filteredBooks = [...mockBooks];

export function initializeEventHandlers(): void {
  // Search functionality
  const searchInput = document.querySelector('#search-input') as HTMLInputElement;
  const searchButton = document.querySelector('#search-button') as HTMLButtonElement;

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }

  // Genre filter
  const genreFilterContainer = document.querySelector('.genre-filters') as HTMLElement;
  if (genreFilterContainer) {
    renderGenreFilter(genres, genreFilterContainer, handleGenreFilter);
  }

  // Author filter
  const authorFilter = document.querySelector('#author-filter') as HTMLSelectElement;
  if (authorFilter) {
    populateAuthorFilter();
    authorFilter.addEventListener('change', handleAuthorFilter);
  }

  // Cart modal
  const cartButton = document.querySelector('.cart-button') as HTMLElement;
  const cartModal = document.querySelector('.cart-modal') as HTMLElement;
  const closeCart = document.querySelector('.close-cart') as HTMLElement;

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.add('active');
        renderCartItemsInModal();
      }
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      if (cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }

  // Close cart modal when clicking outside
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.remove('active');
      }
    });
  }

  // Form validation
  const loginForm = document.querySelector('#login-form') as HTMLFormElement;
  const registerForm = document.querySelector('#register-form') as HTMLFormElement;

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  // Listen for cart updates
  document.addEventListener('cartUpdated', () => {
    updateCartSummary();
  });

  // Initial render
  applyFilters();
}

function handleSearch(): void {
  const searchInput = document.querySelector('#search-input') as HTMLInputElement;
  if (!searchInput) return;

  const query = sanitizeInput(searchInput.value);
  
  if (query.length === 0) {
    currentFilters.searchQuery = undefined;
  } else if (validateSearchQuery(query)) {
    currentFilters.searchQuery = query.toLowerCase();
  }

  applyFilters();
}

function handleGenreFilter(genre: string): void {
  if (genre === 'All') {
    currentFilters.genre = undefined;
  } else {
    currentFilters.genre = genre;
  }
  applyFilters();
}

function handleAuthorFilter(): void {
  const authorFilter = document.querySelector('#author-filter') as HTMLSelectElement;
  if (!authorFilter) return;

  const selectedAuthor = authorFilter.value;
  if (selectedAuthor === 'all') {
    currentFilters.author = undefined;
  } else {
    currentFilters.author = selectedAuthor;
  }
  applyFilters();
}

function populateAuthorFilter(): void {
  const authorFilter = document.querySelector('#author-filter') as HTMLSelectElement;
  if (!authorFilter) return;

  const authors = Array.from(new Set(mockBooks.map(book => book.author))).sort();
  
  authorFilter.innerHTML = '<option value="all">All Authors</option>';
  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.textContent = author;
    authorFilter.appendChild(option);
  });
}

function applyFilters(): void {
  filteredBooks = mockBooks.filter(book => {
    // Search query filter
    if (currentFilters.searchQuery) {
      const matchesTitle = book.title.toLowerCase().includes(currentFilters.searchQuery);
      const matchesAuthor = book.author.toLowerCase().includes(currentFilters.searchQuery);
      if (!matchesTitle && !matchesAuthor) return false;
    }

    // Genre filter
    if (currentFilters.genre) {
      if (book.genre !== currentFilters.genre) return false;
    }

    // Author filter
    if (currentFilters.author) {
      if (book.author !== currentFilters.author) return false;
    }

    return true;
  });

  const booksContainer = document.querySelector('.books-grid') as HTMLElement;
  if (booksContainer) {
    renderBookList(filteredBooks, booksContainer);
  }
}

function handleLogin(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Simple validation (in a real app, this would check against a backend)
  if (email && password) {
    showNotification('Login successful! (Demo mode)');
    form.reset();
  } else {
    showNotification('Please fill in all fields.');
  }
}

function handleRegister(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Simple validation (in a real app, this would register with a backend)
  if (name && email && password) {
    showNotification('Registration successful! (Demo mode)');
    form.reset();
  } else {
    showNotification('Please fill in all fields.');
  }
}

function renderCartItemsInModal(): void {
  const cartContainer = document.querySelector('.cart-items') as HTMLElement;
  if (cartContainer) {
    renderCartItems(cartContainer);
  }
}

