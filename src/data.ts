// Mock JSON data for books
import { Product, MenuItem } from './models.js';

export const mockBooks: Product[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    price: 12.99,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    imageUrl: '/data/greatgatsby.webp',
    rating: 4.5,
    publishedYear: 1925
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    price: 11.99,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    imageUrl: '/data/tokillamockingbird.jpg',
    rating: 4.8,
    publishedYear: 1960
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    price: 13.99,
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    imageUrl: '/data/1984.jpg',
    rating: 4.7,
    publishedYear: 1949
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    price: 10.99,
    description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.',
    imageUrl: '/data/PrideandPrejudice.jpg',
    rating: 4.6,
    publishedYear: 1813
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    price: 12.49,
    description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
    imageUrl: '/data/The_Catcher_in_the_Rye_.jpg',
    rating: 4.3,
    publishedYear: 1951
  },
  {
    id: '6',
    title: 'Lord of the Flies',
    author: 'William Golding',
    genre: 'Fiction',
    price: 11.49,
    description: 'A story about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.',
    imageUrl: '/data/LordoftheFlies.jpg',
    rating: 4.2,
    publishedYear: 1954
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    price: 14.99,
    description: 'A fantasy novel about the adventures of Bilbo Baggins in Middle-earth.',
    imageUrl: '/data/thehobbit.jpg',
    rating: 4.9,
    publishedYear: 1937
  },
  {
    id: '8',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    price: 15.99,
    description: 'The first book in the Harry Potter series, following a young wizard\'s first year at Hogwarts.',
    imageUrl: '/data/harrypotterandthephilosophersstone.jpg',
    rating: 4.8,
    publishedYear: 1997
  },
  {
    id: '9',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: 'Dystopian',
    price: 13.49,
    description: 'A dystopian novel about a televised battle to the death between teenagers.',
    imageUrl: '/data/thehungergames.jpg',
    rating: 4.5,
    publishedYear: 2008
  },
  {
    id: '10',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Mystery',
    price: 12.99,
    description: 'A mystery thriller novel about a murder investigation that uncovers a religious conspiracy.',
    imageUrl: '/data/thedavincicode.jpg',
    rating: 4.1,
    publishedYear: 2003
  },
  {
    id: '11',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genre: 'Mystery',
    price: 13.99,
    description: 'A psychological thriller about a journalist and a hacker investigating a decades-old disappearance.',
    imageUrl: '/data/thegirlwiththedragontattoo.jpg',
    rating: 4.4,
    publishedYear: 2005
  },
  {
    id: '12',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    price: 11.99,
    description: 'A philosophical novel about a young Andalusian shepherd\'s journey to find treasure.',
    imageUrl: '/data/thealchemist.jpg',
    rating: 4.6,
    publishedYear: 1988
  }
];

export const menuItems: MenuItem[] = [
  { id: '1', label: 'Home', href: '#home' },
  { id: '2', label: 'Books', href: '#books' },
  { id: '3', label: 'Genres', href: '#genres' },
  { id: '4', label: 'About', href: '#about' }
];

export const genres: string[] = [
  'All',
  'Fiction',
  'Fantasy',
  'Dystopian',
  'Romance',
  'Mystery'
];

