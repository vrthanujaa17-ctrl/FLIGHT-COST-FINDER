# Flight Cost Finder

## Project Overview
Flight Cost Finder is a web-based application that allows users to search for flights between two cities and filter results based on price, number of stops, and layover duration. The system provides a user-friendly interface to compare flight options efficiently.

## Objective
The main objective of this project is to help users quickly find affordable and convenient flights using customizable filters and sorting options.

---

## Functional Requirements

1. The system shall allow users to enter a departure city.
2. The system shall allow users to enter an arrival city.
3. The system shall allow users to select a travel date.
4. The system shall display available flights based on user input.
5. The system shall allow filtering based on:
   - Maximum price
   - Maximum number of stops
   - Maximum layover duration
6. The system shall allow sorting of results by:
   - Price
   - Number of stops
   - Layover duration
   - Duration
7. The system shall validate user input (e.g., empty fields, same cities).
8. The system shall display appropriate error messages for invalid input.
9. The system shall display a message when no flights are found.

---

## Non-Functional Requirements

1. The system should have a simple and user-friendly interface.
2. The system should respond quickly to user queries.
3. The system should handle invalid inputs gracefully.
4. The application should be responsive and work on different screen sizes.
5. The system should be modular and maintainable for team development.

---

## System Architecture

- Frontend: React (Vite)
- Backend: Flask (Python)
- Data Source: Sample dataset / API integration
- Communication: REST API

---

## Features Implemented

- Flight search by city and date
- Filters (price, stops, layover)
- Sorting (price, stops, layover, duration)
- Loading state
- Error handling
- Clean UI with components

---

## Future Enhancements

- Integration with real flight APIs
- User authentication (login/signup)
- Round-trip booking
- Airline-specific filters
- Payment integration