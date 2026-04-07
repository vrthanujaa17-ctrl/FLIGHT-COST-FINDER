export const fetchFlights = async (queryString) => {
  const response = await fetch(`http://127.0.0.1:5001/flights?${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
};