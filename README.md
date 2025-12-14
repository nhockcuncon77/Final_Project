# BookVerse - Online Bookstore Platform

BookVerse is an interactive online bookstore platform built with HTML5, CSS3, JavaScript (ES6+), and TypeScript. The platform provides a clean and intuitive user interface for browsing, searching, and managing books.

## Features

- **Dynamic Content Rendering**: Books are dynamically rendered using TypeScript and JavaScript
- **Search & Filtering**: Search by title or author, filter by genre and author
- **Shopping Cart**: Add books to cart with quantity management (persisted in localStorage)
- **Favorites**: Save favorite books (persisted in localStorage)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Type-Safe Code**: TypeScript interfaces ensure type safety throughout the application

## Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Layout, styling, responsive grid & flexbox
- **JavaScript (ES6+)**: Client-side logic
- **TypeScript**: Type-safe logic, classes, interfaces, and modular components

## Project Structure

```
BookVerse/
├── src/
│   ├── models.ts          # TypeScript interfaces (User, Product, FormData, MenuItem)
│   ├── data.ts            # Mock JSON data for books
│   ├── validation.ts      # Input validation utilities
│   ├── cart.ts            # Shopping cart management with localStorage
│   ├── favorites.ts       # Favorites management with localStorage
│   ├── render.ts          # Rendering helper functions
│   ├── events.ts          # Event handler functions
│   └── main.ts            # Main application entry point
├── dist/                  # Compiled JavaScript files (generated)
├── index.html             # Main HTML file
├── styles.css             # CSS3 styling
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies

```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Compile TypeScript to JavaScript:
```bash
npm run build
```

3. Start a local server:
```bash
npm run serve
```

The application will open in your browser at `http://localhost:3000`

### Development

To watch for TypeScript changes and automatically recompile:
```bash
npm run watch
```

## Data Models

The application uses TypeScript interfaces for type safety:

- **User**: User account information
- **Product**: Book information (title, author, genre, price, etc.)
- **FormData**: Form input data
- **MenuItem**: Navigation menu items
- **CartItem**: Shopping cart items with quantity
- **FilterOptions**: Search and filter options

## Key Features Implementation

### Dynamic Content Rendering
Books are rendered dynamically using TypeScript rendering functions that create DOM elements programmatically.

### Local Storage
- Shopping cart data is persisted in `localStorage` under the key `bookverse_cart`
- Favorites are persisted in `localStorage` under the key `bookverse_favorites`

### Search & Filtering
- Real-time search by title or author
- Filter by genre using interactive buttons
- Filter by author using a dropdown select

### Responsive Design
The CSS uses flexbox and CSS Grid with media queries to ensure the application works on all screen sizes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT




