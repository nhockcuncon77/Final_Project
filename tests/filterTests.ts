// Filtering Tests for BookVerse
// Test cases with inputs and expected outputs

import { Product, FilterOptions } from '../src/models.js';
import { applyFiltersLogic, getAllGenres, getAllAuthors } from '../src/filterLogic.js';
import { mockBooks } from '../src/data.js';

// Test data - sample books for testing
const testBooks: Product[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    price: 12.99,
    description: 'Test book 1',
    imageUrl: '/data/test1.jpg'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    price: 13.99,
    description: 'Test book 2',
    imageUrl: '/data/test2.jpg'
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    price: 10.99,
    description: 'Test book 3',
    imageUrl: '/data/test3.jpg'
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    price: 14.99,
    description: 'Test book 4',
    imageUrl: '/data/test4.jpg'
  },
  {
    id: '5',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    price: 11.99,
    description: 'Test book 5',
    imageUrl: '/data/test5.jpg'
  }
];

// Test Results Interface
interface TestResult {
  testName: string;
  passed: boolean;
  input: any;
  expectedOutput: any;
  actualOutput: any;
  message?: string;
}

const testResults: TestResult[] = [];

// Helper function to run a test
function runTest(
  testName: string,
  input: any,
  expectedOutput: any,
  testFunction: () => any
): void {
  try {
    const actualOutput = testFunction();
    const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
    
    testResults.push({
      testName,
      passed,
      input,
      expectedOutput,
      actualOutput,
      message: passed ? 'PASSED' : 'FAILED'
    });
  } catch (error) {
    testResults.push({
      testName,
      passed: false,
      input,
      expectedOutput,
      actualOutput: null,
      message: `ERROR: ${error}`
    });
  }
}

// ============================================
// TEST CATEGORY 1: Filter by "All" (No Filter)
// ============================================

console.log('\n=== TEST CATEGORY 1: Filter by "All" (No Filter) ===\n');

// Test 1.1: No filters applied - should return all books
runTest(
  'Test 1.1: No filters - return all books',
  { filters: {} },
  testBooks,
  () => applyFiltersLogic(testBooks, {})
);

// Test 1.2: Empty genre filter (All selected)
runTest(
  'Test 1.2: Genre filter set to undefined (All)',
  { filters: { genre: undefined } },
  testBooks,
  () => applyFiltersLogic(testBooks, { genre: undefined })
);

// Test 1.3: Empty author filter (All Authors selected)
runTest(
  'Test 1.3: Author filter set to undefined (All Authors)',
  { filters: { author: undefined } },
  testBooks,
  () => applyFiltersLogic(testBooks, { author: undefined })
);

// ============================================
// TEST CATEGORY 2: Filter by Genre
// ============================================

console.log('\n=== TEST CATEGORY 2: Filter by Genre ===\n');

// Test 2.1: Filter by "Fiction" genre
runTest(
  'Test 2.1: Filter by Fiction genre',
  { filters: { genre: 'Fiction' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
    { id: '5', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { genre: 'Fiction' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 2.2: Filter by "Dystopian" genre
runTest(
  'Test 2.2: Filter by Dystopian genre',
  { filters: { genre: 'Dystopian' } },
  [
    { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { genre: 'Dystopian' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 2.3: Filter by "Romance" genre
runTest(
  'Test 2.3: Filter by Romance genre',
  { filters: { genre: 'Romance' } },
  [
    { id: '3', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { genre: 'Romance' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 2.4: Filter by "Fantasy" genre
runTest(
  'Test 2.4: Filter by Fantasy genre',
  { filters: { genre: 'Fantasy' } },
  [
    { id: '4', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { genre: 'Fantasy' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 2.5: Filter by non-existent genre
runTest(
  'Test 2.5: Filter by non-existent genre (Mystery)',
  { filters: { genre: 'Mystery' } },
  [],
  () => applyFiltersLogic(testBooks, { genre: 'Mystery' })
);

// ============================================
// TEST CATEGORY 3: Filter by Author
// ============================================

console.log('\n=== TEST CATEGORY 3: Filter by Author ===\n');

// Test 3.1: Filter by "F. Scott Fitzgerald"
runTest(
  'Test 3.1: Filter by author "F. Scott Fitzgerald"',
  { filters: { author: 'F. Scott Fitzgerald' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { author: 'F. Scott Fitzgerald' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 3.2: Filter by "George Orwell"
runTest(
  'Test 3.2: Filter by author "George Orwell"',
  { filters: { author: 'George Orwell' } },
  [
    { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { author: 'George Orwell' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 3.3: Filter by "Jane Austen"
runTest(
  'Test 3.3: Filter by author "Jane Austen"',
  { filters: { author: 'Jane Austen' } },
  [
    { id: '3', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { author: 'Jane Austen' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 3.4: Filter by non-existent author
runTest(
  'Test 3.4: Filter by non-existent author',
  { filters: { author: 'Unknown Author' } },
  [],
  () => applyFiltersLogic(testBooks, { author: 'Unknown Author' })
);

// ============================================
// TEST CATEGORY 4: Search Filter (Title/Author)
// ============================================

console.log('\n=== TEST CATEGORY 4: Search Filter (Title/Author) ===\n');

// Test 4.1: Search by title "Gatsby"
runTest(
  'Test 4.1: Search by title "Gatsby"',
  { filters: { searchQuery: 'Gatsby' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: 'Gatsby' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 4.2: Search by author name "Orwell"
runTest(
  'Test 4.2: Search by author name "Orwell"',
  { filters: { searchQuery: 'Orwell' } },
  [
    { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: 'Orwell' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 4.3: Search by partial title "Kill"
runTest(
  'Test 4.3: Search by partial title "Kill"',
  { filters: { searchQuery: 'Kill' } },
  [
    { id: '5', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: 'Kill' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 4.4: Search case-insensitive "pride"
runTest(
  'Test 4.4: Search case-insensitive "pride"',
  { filters: { searchQuery: 'pride' } },
  [
    { id: '3', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: 'pride' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 4.5: Search with no matches
runTest(
  'Test 4.5: Search with no matches "XYZ123"',
  { filters: { searchQuery: 'XYZ123' } },
  [],
  () => applyFiltersLogic(testBooks, { searchQuery: 'XYZ123' })
);

// ============================================
// TEST CATEGORY 5: Combined Filters
// ============================================

console.log('\n=== TEST CATEGORY 5: Combined Filters ===\n');

// Test 5.1: Genre + Author filter
runTest(
  'Test 5.1: Filter by Fiction genre AND F. Scott Fitzgerald author',
  { filters: { genre: 'Fiction', author: 'F. Scott Fitzgerald' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { genre: 'Fiction', author: 'F. Scott Fitzgerald' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 5.2: Genre + Author filter (no match)
runTest(
  'Test 5.2: Filter by Fiction genre AND George Orwell author (no match)',
  { filters: { genre: 'Fiction', author: 'George Orwell' } },
  [],
  () => applyFiltersLogic(testBooks, { genre: 'Fiction', author: 'George Orwell' })
);

// Test 5.3: Search + Genre filter
runTest(
  'Test 5.3: Search "Gatsby" + Fiction genre',
  { filters: { searchQuery: 'Gatsby', genre: 'Fiction' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: 'Gatsby', genre: 'Fiction' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 5.4: Search + Author filter
runTest(
  'Test 5.4: Search "1984" + George Orwell author',
  { filters: { searchQuery: '1984', author: 'George Orwell' } },
  [
    { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { searchQuery: '1984', author: 'George Orwell' });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// Test 5.5: All three filters combined
runTest(
  'Test 5.5: Search "Gatsby" + Fiction genre + F. Scott Fitzgerald author',
  { filters: { searchQuery: 'Gatsby', genre: 'Fiction', author: 'F. Scott Fitzgerald' } },
  [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' }
  ],
  () => {
    const result = applyFiltersLogic(testBooks, { 
      searchQuery: 'Gatsby', 
      genre: 'Fiction', 
      author: 'F. Scott Fitzgerald' 
    });
    return result.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre
    }));
  }
);

// ============================================
// TEST CATEGORY 6: Utility Functions
// ============================================

console.log('\n=== TEST CATEGORY 6: Utility Functions ===\n');

// Test 6.1: Get all genres
runTest(
  'Test 6.1: Get all unique genres',
  { books: testBooks },
  ['Dystopian', 'Fantasy', 'Fiction', 'Romance'],
  () => getAllGenres(testBooks)
);

// Test 6.2: Get all authors
runTest(
  'Test 6.2: Get all unique authors',
  { books: testBooks },
  ['F. Scott Fitzgerald', 'George Orwell', 'Harper Lee', 'J.R.R. Tolkien', 'Jane Austen'],
  () => getAllAuthors(testBooks)
);

// ============================================
// TEST RESULTS SUMMARY
// ============================================

console.log('\n' + '='.repeat(60));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(60) + '\n');

let passedCount = 0;
let failedCount = 0;

testResults.forEach((result, index) => {
  const status = result.passed ? '✓ PASS' : '✗ FAIL';
  console.log(`${index + 1}. ${status} - ${result.testName}`);
  
  if (!result.passed) {
    console.log(`   Input: ${JSON.stringify(result.input)}`);
    console.log(`   Expected: ${JSON.stringify(result.expectedOutput)}`);
    console.log(`   Actual: ${JSON.stringify(result.actualOutput)}`);
    if (result.message) {
      console.log(`   ${result.message}`);
    }
  }
  
  if (result.passed) {
    passedCount++;
  } else {
    failedCount++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`Total Tests: ${testResults.length}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`Success Rate: ${((passedCount / testResults.length) * 100).toFixed(1)}%`);
console.log('='.repeat(60) + '\n');

// Export test results for external use
export { testResults, testBooks };

