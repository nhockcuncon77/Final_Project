# Filtering Tests - Quick Reference

## Test Categories with Inputs/Outputs

### Category 1: Filter by "All" (No Filter)

**Test 1.1: No filters applied**
- **Input**: `{ filters: {} }`
- **Expected Output**: All 5 books returned
- **Purpose**: Verify default behavior shows all books

**Test 1.2: Genre filter set to "All"**
- **Input**: `{ filters: { genre: undefined } }`
- **Expected Output**: All 5 books returned
- **Purpose**: Verify "All" genre option works

**Test 1.3: Author filter set to "All Authors"**
- **Input**: `{ filters: { author: undefined } }`
- **Expected Output**: All 5 books returned
- **Purpose**: Verify "All Authors" option works

---

### Category 2: Filter by Genre

**Test 2.1: Filter by "Fiction"**
- **Input**: `{ filters: { genre: 'Fiction' } }`
- **Expected Output**: 2 books
  - "The Great Gatsby" by F. Scott Fitzgerald
  - "To Kill a Mockingbird" by Harper Lee

**Test 2.2: Filter by "Dystopian"**
- **Input**: `{ filters: { genre: 'Dystopian' } }`
- **Expected Output**: 1 book
  - "1984" by George Orwell

**Test 2.3: Filter by "Romance"**
- **Input**: `{ filters: { genre: 'Romance' } }`
- **Expected Output**: 1 book
  - "Pride and Prejudice" by Jane Austen

**Test 2.4: Filter by "Fantasy"**
- **Input**: `{ filters: { genre: 'Fantasy' } }`
- **Expected Output**: 1 book
  - "The Hobbit" by J.R.R. Tolkien

**Test 2.5: Filter by non-existent genre**
- **Input**: `{ filters: { genre: 'Mystery' } }`
- **Expected Output**: Empty array (0 books)
- **Purpose**: Verify edge case handling

---

### Category 3: Filter by Author

**Test 3.1: Filter by "F. Scott Fitzgerald"**
- **Input**: `{ filters: { author: 'F. Scott Fitzgerald' } }`
- **Expected Output**: 1 book
  - "The Great Gatsby"

**Test 3.2: Filter by "George Orwell"**
- **Input**: `{ filters: { author: 'George Orwell' } }`
- **Expected Output**: 1 book
  - "1984"

**Test 3.3: Filter by "Jane Austen"**
- **Input**: `{ filters: { author: 'Jane Austen' } }`
- **Expected Output**: 1 book
  - "Pride and Prejudice"

**Test 3.4: Filter by non-existent author**
- **Input**: `{ filters: { author: 'Unknown Author' } }`
- **Expected Output**: Empty array (0 books)
- **Purpose**: Verify edge case handling

---

### Category 4: Search Filter (Title/Author)

**Test 4.1: Search by title "Gatsby"**
- **Input**: `{ filters: { searchQuery: 'Gatsby' } }`
- **Expected Output**: 1 book
  - "The Great Gatsby"

**Test 4.2: Search by author name "Orwell"**
- **Input**: `{ filters: { searchQuery: 'Orwell' } }`
- **Expected Output**: 1 book
  - "1984"

**Test 4.3: Search by partial title "Kill"**
- **Input**: `{ filters: { searchQuery: 'Kill' } }`
- **Expected Output**: 1 book
  - "To Kill a Mockingbird"

**Test 4.4: Search case-insensitive "pride"**
- **Input**: `{ filters: { searchQuery: 'pride' } }`
- **Expected Output**: 1 book
  - "Pride and Prejudice"
- **Purpose**: Verify case-insensitive search

**Test 4.5: Search with no matches**
- **Input**: `{ filters: { searchQuery: 'XYZ123' } }`
- **Expected Output**: Empty array (0 books)
- **Purpose**: Verify edge case handling

---

### Category 5: Combined Filters

**Test 5.1: Genre + Author (match)**
- **Input**: `{ filters: { genre: 'Fiction', author: 'F. Scott Fitzgerald' } }`
- **Expected Output**: 1 book
  - "The Great Gatsby"
- **Purpose**: Verify AND logic between filters

**Test 5.2: Genre + Author (no match)**
- **Input**: `{ filters: { genre: 'Fiction', author: 'George Orwell' } }`
- **Expected Output**: Empty array (0 books)
- **Purpose**: Verify filters work together (AND logic)

**Test 5.3: Search + Genre**
- **Input**: `{ filters: { searchQuery: 'Gatsby', genre: 'Fiction' } }`
- **Expected Output**: 1 book
  - "The Great Gatsby"

**Test 5.4: Search + Author**
- **Input**: `{ filters: { searchQuery: '1984', author: 'George Orwell' } }`
- **Expected Output**: 1 book
  - "1984"

**Test 5.5: All three filters combined**
- **Input**: `{ filters: { searchQuery: 'Gatsby', genre: 'Fiction', author: 'F. Scott Fitzgerald' } }`
- **Expected Output**: 1 book
  - "The Great Gatsby"
- **Purpose**: Verify all filters work together

---

### Category 6: Utility Functions

**Test 6.1: Get all unique genres**
- **Input**: Array of 5 test books
- **Expected Output**: `['Dystopian', 'Fantasy', 'Fiction', 'Romance']`
- **Purpose**: Verify genre extraction and sorting

**Test 6.2: Get all unique authors**
- **Input**: Array of 5 test books
- **Expected Output**: `['F. Scott Fitzgerald', 'George Orwell', 'Harper Lee', 'J.R.R. Tolkien', 'Jane Austen']`
- **Purpose**: Verify author extraction and sorting

---

## How to Run Tests

```bash
# Compile TypeScript and run tests
npm test

# Or manually:
npm run build
node tests/runTests.js
```

## Test Results Format

Each test shows:
- ✓ PASS or ✗ FAIL
- Test name
- Input parameters
- Expected vs Actual output (if failed)

Final summary shows:
- Total tests run
- Number passed
- Number failed
- Success rate percentage


