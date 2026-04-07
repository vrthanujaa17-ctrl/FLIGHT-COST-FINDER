import { useState } from "react";

function App() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxStops, setMaxStops] = useState("");
  const [maxLayover, setMaxLayover] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    if (!fromCity || !toCity) {
      setError("Please enter both From City and To City.");
      setFlights([]);
      return;
    }

    if (fromCity.toLowerCase() === toCity.toLowerCase()) {
      setError("From City and To City cannot be the same.");
      setFlights([]);
      return;
    }

    setError("");

    try {
      const query = new URLSearchParams({
        from: fromCity,
        to: toCity,
        max_price: maxPrice,
        max_stops: maxStops,
        max_layover: maxLayover,
      });

      const response = await fetch(`http://127.0.0.1:5000/flights?${query}`);
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError("Something went wrong while fetching flights.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Flight Cost Finder</h1>
      <p>Search flights by route and filter them by price, stops, and layover.</p>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "25px",
        }}
      >
        <h2>Search Flights</h2>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="From City"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "180px" }}
          />

          <input
            type="text"
            placeholder="To City"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "180px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "180px" }}
          />

          <input
            type="number"
            placeholder="Max Stops"
            value={maxStops}
            onChange={(e) => setMaxStops(e.target.value)}
            style={{ padding: "10px", marginRight: "10px", width: "180px" }}
          />

          <input
            type="number"
            placeholder="Max Layover (hrs)"
            value={maxLayover}
            onChange={(e) => setMaxLayover(e.target.value)}
            style={{ padding: "10px", width: "180px" }}
          />
        </div>

        <button
          onClick={searchFlights}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}
      </div>

      <h2>Flight Results</h2>

      {flights.length === 0 ? (
        <p>No flights found</p>
      ) : (
        flights.map((flight) => (
          <div
            key={flight.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "12px",
            }}
          >
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Route:</strong> {flight.from_city} → {flight.to_city}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
            <p><strong>Stops:</strong> {flight.stops}</p>
            <p><strong>Layover:</strong> {flight.layover} hrs</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;