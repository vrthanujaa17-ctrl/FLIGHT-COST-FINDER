# ✈️ Flight Cost Finder

## 📌 Project Overview
Flight Cost Finder is a web-based application that allows users to search for flights between two cities and filter results based on price, number of stops, layover duration, and travel date. The application provides an intuitive interface to compare multiple flight options efficiently.

---

## 🎯 Objective
The objective of this project is to help users quickly find affordable and convenient flights using customizable filters and sorting options.

---

## 🚀 Features

### 🔍 Search
- Search flights by:
  - Departure city
  - Arrival city
  - Travel date

### 🎛️ Filters
- Maximum price
- Maximum number of stops
- Maximum layover duration

### 🔄 Sorting
- Cheapest flights first
- Fewest stops
- Shortest layover
- Shortest duration

### ⚙️ Additional Features
- Input validation (empty fields, same city check)
- Loading state while fetching data
- Error handling
- Clean and responsive UI

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- HTML, CSS, JavaScript

### Backend
- Flask (Python)

### Data Source
- Sample dataset (can be extended with real flight APIs)

---

## 🧩 Project Structure

```bash
FLIGHT-COST-FINDER/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx
│   │   │   ├── FlightCard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│
├── backend/
│   ├── app.py
│
├── docs/
│   ├── requirements.md
│   └── test-cases.md
│
├── README.md
└── .gitignore
