// Rendering helper functions
import { Product, FilterOptions, CartItem } from './models.js';
import { isFavorite, toggleFavorite } from './favorites.js';
import { getCart, addToCart, removeFromCart, updateCartQuantity } from './cart.js';

export function renderBookCard(book: Product, container: HTMLElement): void {
  const card = document.createElement('div');
  card.className = 'book-card';
  card.setAttribute('data-book-id', book.id);

  const isFav = isFavorite(book.id);
  const favoriteClass = isFav ? 'favorite active' : 'favorite';
  const favoriteIcon = isFav ? '❤️' : '🤍';

  // Log image path for debugging
  console.log(`Loading image for ${book.title}: ${book.imageUrl}`);

  card.innerHTML = `
    <div class="book-image-container">
      <img src="${book.imageUrl}" alt="${book.title}" class="book-image" loading="lazy" 
           onerror="console.error('Failed to load image:', '${book.imageUrl}'); this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'%3E%3Crect fill=\'%23ddd\' width=\'300\' height=\'400\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'18\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EImage not found%3C/text%3E%3C/svg%3E';"
           onload="console.log('Successfully loaded image:', '${book.imageUrl}');">
      <button class="${favoriteClass}" data-book-id="${book.id}" aria-label="Add to favorites">
        ${favoriteIcon}
      </button>
    </div>
    <div class="book-info">
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">by ${book.author}</p>
      <p class="book-genre">${book.genre}</p>
      ${book.rating ? `<div class="book-rating">⭐ ${book.rating.toFixed(1)}</div>` : ''}
      <p class="book-description">${book.description}</p>
      <div class="book-footer">
        <span class="book-price">$${book.price.toFixed(2)}</span>
        <button class="btn-add-cart" data-book-id="${book.id}">Add to Cart</button>
      </div>
    </div>
  `;

  // Add event listeners
  const addToCartBtn = card.querySelector('.btn-add-cart') as HTMLButtonElement;
  const favoriteBtn = card.querySelector('.favorite') as HTMLButtonElement;

  addToCartBtn?.addEventListener('click', () => {
    addToCart(book);
    showNotification(`${book.title} added to cart!`);
  });

  favoriteBtn?.addEventListener('click', () => {
    toggleFavorite(book.id);
    const isFavNow = isFavorite(book.id);
    favoriteBtn.className = isFavNow ? 'favorite active' : 'favorite';
    favoriteBtn.textContent = isFavNow ? '❤️' : '🤍';
    showNotification(isFavNow ? 'Added to favorites!' : 'Removed from favorites!');
  });

  container.appendChild(card);
}

export function renderBookList(books: Product[], container: HTMLElement): void {
  container.innerHTML = '';
  
  if (books.length === 0) {
    container.innerHTML = '<p class="no-results">No books found. Try adjusting your filters.</p>';
    return;
  }

  books.forEach(book => {
    renderBookCard(book, container);
  });
}

export function renderCartItems(container: HTMLElement): void {
  const cart = getCart();
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cart.forEach((item: CartItem) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.product.imageUrl}" alt="${item.product.title}" class="cart-item-image">
      <div class="cart-item-info">
        <h4>${item.product.title}</h4>
        <p>by ${item.product.author}</p>
        <p class="cart-item-price">$${item.product.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="btn-quantity" data-action="decrease" data-book-id="${item.product.id}">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="btn-quantity" data-action="increase" data-book-id="${item.product.id}">+</button>
        <button class="btn-remove" data-book-id="${item.product.id}">Remove</button>
      </div>
    `;

    // Add event listeners
    const decreaseBtn = cartItem.querySelector('[data-action="decrease"]') as HTMLButtonElement;
    const increaseBtn = cartItem.querySelector('[data-action="increase"]') as HTMLButtonElement;
    const removeBtn = cartItem.querySelector('.btn-remove') as HTMLButtonElement;

    decreaseBtn?.addEventListener('click', () => {
      updateCartQuantity(item.product.id, item.quantity - 1);
      renderCartItems(container);
      updateCartSummary();
    });

    increaseBtn?.addEventListener('click', () => {
      updateCartQuantity(item.product.id, item.quantity + 1);
      renderCartItems(container);
      updateCartSummary();
    });

    removeBtn?.addEventListener('click', () => {
      removeFromCart(item.product.id);
      renderCartItems(container);
      updateCartSummary();
      showNotification(`${item.product.title} removed from cart.`);
    });

    container.appendChild(cartItem);
  });

  updateCartSummary();
}

export function updateCartSummary(): void {
  const cartTotal = getCart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = getCart().reduce((count, item) => count + item.quantity, 0);

  const totalElement = document.querySelector('.cart-total') as HTMLElement;
  const countElement = document.querySelector('.cart-count') as HTMLElement;

  if (totalElement) {
    totalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
  }

  if (countElement) {
    countElement.textContent = cartCount.toString();
    countElement.style.display = cartCount > 0 ? 'inline-block' : 'none';
  }
}

export function renderGenreFilter(genres: string[], container: HTMLElement, onSelect: (genre: string) => void): void {
  container.innerHTML = '';
  
  genres.forEach(genre => {
    const button = document.createElement('button');
    button.className = 'genre-filter-btn';
    button.textContent = genre;
    button.setAttribute('data-genre', genre);
    
    if (genre === 'All') {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      container.querySelectorAll('.genre-filter-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      onSelect(genre);
    });

    container.appendChild(button);
  });
}

export function showNotification(message: string, duration: number = 3000): void {
  // Remove existing notification if any
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

