// Simple test runner for filter tests
// Run with: node tests/runTests.js

// Note: This requires the TypeScript files to be compiled first
// Run: npm run build
// Then: node tests/runTests.js

// Since we're running in Node.js, we need to use the compiled JavaScript
const { applyFiltersLogic, getAllGenres, getAllAuthors } = require('../dist/filterLogic.js');
const { mockBooks } = require('../dist/data.js');

// Test data
const testBooks = [
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

const testResults = [];

function runTest(testName, input, expectedOutput, testFunction) {
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
      message: `ERROR: ${error.message}`
    });
  }
}

// Run all tests
console.log('\n=== TEST CATEGORY 1: Filter by "All" (No Filter) ===\n');

runTest(
  'Test 1.1: No filters - return all books',
  { filters: {} },
  testBooks,
  () => applyFiltersLogic(testBooks, {})
);

console.log('\n=== TEST CATEGORY 2: Filter by Genre ===\n');

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

console.log('\n=== TEST CATEGORY 3: Filter by Author ===\n');

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

console.log('\n=== TEST CATEGORY 4: Search Filter ===\n');

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

console.log('\n=== TEST RESULTS SUMMARY ===\n');

let passedCount = 0;
let failedCount = 0;

testResults.forEach((result, index) => {
  const status = result.passed ? '✓ PASS' : '✗ FAIL';
  console.log(`${index + 1}. ${status} - ${result.testName}`);
  
  if (!result.passed) {
    console.log(`   Input: ${JSON.stringify(result.input)}`);
    console.log(`   Expected: ${JSON.stringify(result.expectedOutput)}`);
    console.log(`   Actual: ${JSON.stringify(result.actualOutput)}`);
  }
  
  if (result.passed) {
    passedCount++;
  } else {
    failedCount++;
  }
});

console.log(`\nTotal: ${testResults.length} | Passed: ${passedCount} | Failed: ${failedCount}\n`);


