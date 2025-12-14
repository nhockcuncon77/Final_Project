# Filtering Tests Documentation

This document describes the test cases for the BookVerse filtering functionality.

## Test Categories

### Category 1: Filter by "All" (No Filter)
Tests that verify when no filters are applied, all books are returned.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 1.1 | No filters - return all books | `{ filters: {} }` | All 5 test books |
| 1.2 | Genre filter set to undefined (All) | `{ filters: { genre: undefined } }` | All 5 test books |
| 1.3 | Author filter set to undefined (All Authors) | `{ filters: { author: undefined } }` | All 5 test books |

### Category 2: Filter by Genre
Tests that verify filtering by specific genres works correctly.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 2.1 | Filter by Fiction genre | `{ filters: { genre: 'Fiction' } }` | 2 books: "The Great Gatsby", "To Kill a Mockingbird" |
| 2.2 | Filter by Dystopian genre | `{ filters: { genre: 'Dystopian' } }` | 1 book: "1984" |
| 2.3 | Filter by Romance genre | `{ filters: { genre: 'Romance' } }` | 1 book: "Pride and Prejudice" |
| 2.4 | Filter by Fantasy genre | `{ filters: { genre: 'Fantasy' } }` | 1 book: "The Hobbit" |
| 2.5 | Filter by non-existent genre | `{ filters: { genre: 'Mystery' } }` | Empty array (0 books) |

### Category 3: Filter by Author
Tests that verify filtering by specific authors works correctly.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 3.1 | Filter by "F. Scott Fitzgerald" | `{ filters: { author: 'F. Scott Fitzgerald' } }` | 1 book: "The Great Gatsby" |
| 3.2 | Filter by "George Orwell" | `{ filters: { author: 'George Orwell' } }` | 1 book: "1984" |
| 3.3 | Filter by "Jane Austen" | `{ filters: { author: 'Jane Austen' } }` | 1 book: "Pride and Prejudice" |
| 3.4 | Filter by non-existent author | `{ filters: { author: 'Unknown Author' } }` | Empty array (0 books) |

### Category 4: Search Filter (Title/Author)
Tests that verify searching by title or author name works correctly.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 4.1 | Search by title "Gatsby" | `{ filters: { searchQuery: 'Gatsby' } }` | 1 book: "The Great Gatsby" |
| 4.2 | Search by author name "Orwell" | `{ filters: { searchQuery: 'Orwell' } }` | 1 book: "1984" |
| 4.3 | Search by partial title "Kill" | `{ filters: { searchQuery: 'Kill' } }` | 1 book: "To Kill a Mockingbird" |
| 4.4 | Search case-insensitive "pride" | `{ filters: { searchQuery: 'pride' } }` | 1 book: "Pride and Prejudice" |
| 4.5 | Search with no matches | `{ filters: { searchQuery: 'XYZ123' } }` | Empty array (0 books) |

### Category 5: Combined Filters
Tests that verify multiple filters can be applied simultaneously.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 5.1 | Genre + Author filter (match) | `{ filters: { genre: 'Fiction', author: 'F. Scott Fitzgerald' } }` | 1 book: "The Great Gatsby" |
| 5.2 | Genre + Author filter (no match) | `{ filters: { genre: 'Fiction', author: 'George Orwell' } }` | Empty array (0 books) |
| 5.3 | Search + Genre filter | `{ filters: { searchQuery: 'Gatsby', genre: 'Fiction' } }` | 1 book: "The Great Gatsby" |
| 5.4 | Search + Author filter | `{ filters: { searchQuery: '1984', author: 'George Orwell' } }` | 1 book: "1984" |
| 5.5 | All three filters combined | `{ filters: { searchQuery: 'Gatsby', genre: 'Fiction', author: 'F. Scott Fitzgerald' } }` | 1 book: "The Great Gatsby" |

### Category 6: Utility Functions
Tests for helper functions that extract unique values.

| Test ID | Test Name | Input | Expected Output |
|---------|-----------|-------|-----------------|
| 6.1 | Get all unique genres | `{ books: testBooks }` | `['Dystopian', 'Fantasy', 'Fiction', 'Romance']` |
| 6.2 | Get all unique authors | `{ books: testBooks }` | `['F. Scott Fitzgerald', 'George Orwell', 'Harper Lee', 'J.R.R. Tolkien', 'Jane Austen']` |

## Test Data

The test suite uses the following sample books:

1. **The Great Gatsby** - F. Scott Fitzgerald - Fiction
2. **1984** - George Orwell - Dystopian
3. **Pride and Prejudice** - Jane Austen - Romance
4. **The Hobbit** - J.R.R. Tolkien - Fantasy
5. **To Kill a Mockingbird** - Harper Lee - Fiction

## Running the Tests

### Option 1: Using TypeScript (Recommended)
1. Compile TypeScript: `npm run build`
2. Run tests: `npx ts-node tests/filterTests.ts`

### Option 2: Using Compiled JavaScript
1. Compile TypeScript: `npm run build`
2. Run tests: `node tests/runTests.js`

## Expected Test Results

All tests should pass. The test suite includes:
- **Total Tests**: 20+
- **Test Categories**: 6
- **Coverage**: All filtering scenarios including edge cases

## Test Output Format

Each test displays:
- Test name
- Input parameters
- Expected output
- Actual output
- Pass/Fail status

At the end, a summary shows:
- Total number of tests
- Number of passed tests
- Number of failed tests
- Success rate percentage


