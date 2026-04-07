import { useState } from "react";
import SearchForm from "./components/SearchForm";
import FlightCard from "./components/FlightCard";
import { fetchFlights } from "./services/api";

function App() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxStops, setMaxStops] = useState("");
  const [maxLayover, setMaxLayover] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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

    if (
      (maxPrice && Number(maxPrice) < 0) ||
      (maxStops && Number(maxStops) < 0) ||
      (maxLayover && Number(maxLayover) < 0)
    ) {
      setError("Filter values cannot be negative.");
      setFlights([]);
      return;
    }

    setError("");
    setLoading(true);
    setHasSearched(true);

    try {
      const query = new URLSearchParams({
        from: fromCity,
        to: toCity,
        date: departureDate,
        max_price: maxPrice,
        max_stops: maxStops,
        max_layover: maxLayover,
      });

      const data = await fetchFlights(query.toString());

      let sortedData = [...data];

      if (sortBy === "price") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortBy === "stops") {
        sortedData.sort((a, b) => a.stops - b.stops);
      } else if (sortBy === "layover") {
        sortedData.sort((a, b) => a.layover - b.layover);
      } else if (sortBy === "duration") {
        sortedData.sort((a, b) => a.duration_minutes - b.duration_minutes);
      }

      setFlights(sortedData);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Unable to fetch flight data. Please try again later.");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Flight Cost Finder</h1>
      <p className="app-subtitle">
        Search flights by route and compare them using price, stops, layover,
        and duration.
      </p>

      <SearchForm
        fromCity={fromCity}
        toCity={toCity}
        departureDate={departureDate}
        maxPrice={maxPrice}
        maxStops={maxStops}
        maxLayover={maxLayover}
        sortBy={sortBy}
        setFromCity={setFromCity}
        setToCity={setToCity}
        setDepartureDate={setDepartureDate}
        setMaxPrice={setMaxPrice}
        setMaxStops={setMaxStops}
        setMaxLayover={setMaxLayover}
        setSortBy={setSortBy}
        searchFlights={searchFlights}
        error={error}
      />

      <h2 className="results-title">Flight Results</h2>

      {loading && <p className="info-text">Loading flights...</p>}

      {!loading && hasSearched && flights.length === 0 && !error && (
        <div className="empty-state">
          <p>No matching flights found for your search and filters.</p>
        </div>
      )}

      {!loading &&
        flights.length > 0 &&
        flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)}
    </div>
  );
}

export default App;