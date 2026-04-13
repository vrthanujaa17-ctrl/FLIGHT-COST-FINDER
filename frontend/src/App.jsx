import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [from, setFrom] = useState("NYC");
  const [to, setTo] = useState("LAX");
  const [date, setDate] = useState("2026-06-15");

  const [maxPrice, setMaxPrice] = useState("");
  const [maxStops, setMaxStops] = useState("");
  const [maxLayover, setMaxLayover] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const searchFlights = async () => {
    setLoading(true);
    setError("");
    setInfoMessage("");
    setUsingFallback(false);

    try {
      const API_BASE = "http://127.0.0.1:5001";

      const response = await fetch(
        `${API_BASE}/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
          to
        )}&date=${encodeURIComponent(date)}`
      );

      const data = await response.json();

      if (!response.ok) {
        setFlights(Array.isArray(data.fallback) ? data.fallback : []);
        setUsingFallback(Boolean(data.fallback));
        setError(data.error || "Request failed.");
        setInfoMessage(data.message || "");
        return;
      }

      if (Array.isArray(data.flights)) {
        setFlights(data.flights);
        setUsingFallback(false);
        setInfoMessage(data.message || "Live results loaded.");
        return;
      }

      if (Array.isArray(data.fallback)) {
        setFlights(data.fallback);
        setUsingFallback(true);
        setInfoMessage(data.message || "Showing fallback mock data.");
        return;
      }

      if (Array.isArray(data)) {
        setFlights(data);
        setUsingFallback(false);
        setInfoMessage("Live results loaded.");
        return;
      }

      setFlights([]);
      setError("No valid flight data received from backend.");
    } catch (err) {
      console.error("Error fetching flights:", err);
      setFlights([]);
      setError("Could not connect to backend. Please check if Flask is running.");
      setInfoMessage("");
      setUsingFallback(false);
    } finally {
      setLoading(false);
    }
  };

  const getNumericPrice = (price) => {
    if (!price) return Number.POSITIVE_INFINITY;
    const numeric = String(price).replace(/[^0-9.]/g, "");
    return numeric ? parseFloat(numeric) : Number.POSITIVE_INFINITY;
  };

  const getLayoverValue = (flight) => {
    if (flight?.layoverMinutes !== undefined && flight?.layoverMinutes !== null) {
      return Number(flight.layoverMinutes);
    }
    if (flight?.layoverHours !== undefined && flight?.layoverHours !== null) {
      return Number(flight.layoverHours) * 60;
    }
    return null;
  };

  const formatDate = (dateTime) => {
    if (!dateTime || !String(dateTime).includes("T")) return "N/A";
    return String(dateTime).split("T")[0];
  };

  const formatTime = (dateTime) => {
    if (!dateTime || !String(dateTime).includes("T")) return "N/A";
    return String(dateTime).split("T")[1]?.slice(0, 5) || "N/A";
  };

  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights];

    if (maxPrice !== "") {
      result = result.filter(
        (flight) => getNumericPrice(flight.price) <= Number(maxPrice)
      );
    }

    if (maxStops !== "") {
      result = result.filter(
        (flight) => Number(flight.stopCount ?? 0) <= Number(maxStops)
      );
    }

    if (maxLayover !== "") {
      result = result.filter((flight) => {
        const layover = getLayoverValue(flight);
        if (layover === null) return true;
        return layover <= Number(maxLayover);
      });
    }

    result.sort((a, b) => {
      if (sortBy === "price") {
        return getNumericPrice(a.price) - getNumericPrice(b.price);
      }
      if (sortBy === "duration") {
        return Number(a.durationMinutes ?? 0) - Number(b.durationMinutes ?? 0);
      }
      if (sortBy === "stops") {
        return Number(a.stopCount ?? 0) - Number(b.stopCount ?? 0);
      }
      return 0;
    });

    return result;
  }, [flights, maxPrice, maxStops, maxLayover, sortBy]);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Flight Cost Finder
      </h1>

      <h2>Search Flights</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value.toUpperCase())}
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value.toUpperCase())}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={searchFlights} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <h2>Filter & Sort</h2>

      <div className="search-box">
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Stops"
          value={maxStops}
          onChange={(e) => setMaxStops(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Layover (mins)"
          value={maxLayover}
          onChange={(e) => setMaxLayover(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Sort by Price</option>
          <option value="duration">Sort by Duration</option>
          <option value="stops">Sort by Stops</option>
        </select>
      </div>

      <h2>Flight Results</h2>

      {infoMessage && (
        <p style={{ color: usingFallback ? "#b26a00" : "green", fontWeight: "500" }}>
          {infoMessage}
        </p>
      )}

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && filteredAndSortedFlights.length === 0 && flights.length === 0 && (
        <p>No flights loaded yet. Search to see results.</p>
      )}

      {!loading && filteredAndSortedFlights.length === 0 && flights.length > 0 && (
        <p>No flights match the selected filters.</p>
      )}

      {filteredAndSortedFlights.map((flight, index) => {
        const layover = getLayoverValue(flight);

        return (
          <div key={index} className="flight-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{flight.airline || "Unknown Airline"}</h3>
              <h3>{flight.price || "N/A"}</h3>
            </div>

            <p>
              <strong>Route:</strong> {flight.origin || "N/A"} → {flight.destination || "N/A"}
            </p>

            <p>
              <strong>Date:</strong> {formatDate(flight.departureTime)}
            </p>

            <p>
              <strong>Departure:</strong> {formatTime(flight.departureTime)}
            </p>

            <p>
              <strong>Arrival:</strong> {formatTime(flight.arrivalTime)}
            </p>

            <p>
              <strong>Duration:</strong> {flight.durationMinutes ?? "N/A"} mins
            </p>

            <p>
              <strong>Stops:</strong> {flight.stopCount ?? "N/A"}
            </p>

            <p>
              <strong>Layover:</strong>{" "}
              {layover === 0
                ? "0 mins"
                : layover !== null
                ? `${layover} mins`
                : Number(flight.stopCount) > 0
                ? "Connecting flight"
                : "N/A"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;