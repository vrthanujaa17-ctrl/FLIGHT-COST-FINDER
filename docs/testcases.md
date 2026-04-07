# Test Cases - Flight Cost Finder

## Test Case 1: Valid Search
**Input:**
- From: Detroit
- To: New York
- Date: 2026-04-20

**Expected Output:**
- List of flights is displayed

---

## Test Case 2: Empty Input
**Input:**
- From: (empty)
- To: New York

**Expected Output:**
- Error message: "Please enter both From City and To City."

---

## Test Case 3: Same Cities
**Input:**
- From: Detroit
- To: Detroit

**Expected Output:**
- Error message: "From City and To City cannot be the same."

---

## Test Case 4: Max Price Filter
**Input:**
- Max Price: 200

**Expected Output:**
- Only flights with price ≤ 200 are displayed

---

## Test Case 5: Max Stops Filter
**Input:**
- Max Stops: 1

**Expected Output:**
- Flights with more than 1 stop are removed

---

## Test Case 6: Max Layover Filter
**Input:**
- Max Layover: 2

**Expected Output:**
- Flights with layover > 2 hours are removed

---

## Test Case 7: Sorting by Price
**Input:**
- Sort: Cheapest First

**Expected Output:**
- Flights sorted in ascending price order

---

## Test Case 8: No Results Found
**Input:**
- Filters that match no flights

**Expected Output:**
- Message: "No matching flights found"

---

## Test Case 9: Loading State
**Action:**
- Click search

**Expected Output:**
- "Loading flights..." is displayed temporarily

---

## Test Case 10: API Failure (Future)
**Condition:**
- API is unavailable

**Expected Output:**
- Error message: "Unable to fetch flight data"