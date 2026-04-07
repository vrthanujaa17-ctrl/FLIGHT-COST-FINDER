from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

flights = [
    {
        "id": 1,
        "from_city": "Detroit",
        "to_city": "New York",
        "airline": "Delta",
        "price": 220,
        "stops": 1,
        "layover": 2,
        "departure_time": "08:00 AM",
        "arrival_time": "12:30 PM",
        "duration": "4h 30m",
        "duration_minutes": 270,
        "date": "2026-04-20",
        "ticket_class": "Economy"
    },
    {
        "id": 2,
        "from_city": "Detroit",
        "to_city": "New York",
        "airline": "Spirit",
        "price": 150,
        "stops": 2,
        "layover": 4,
        "departure_time": "10:00 AM",
        "arrival_time": "05:00 PM",
        "duration": "7h 00m",
        "duration_minutes": 420,
        "date": "2026-04-20",
        "ticket_class": "Economy"
    },
    {
        "id": 3,
        "from_city": "Detroit",
        "to_city": "Boston",
        "airline": "JetBlue",
        "price": 210,
        "stops": 1,
        "layover": 2,
        "departure_time": "09:30 AM",
        "arrival_time": "01:45 PM",
        "duration": "4h 15m",
        "duration_minutes": 255,
        "date": "2026-04-20",
        "ticket_class": "Economy"
    },
    {
        "id": 4,
        "from_city": "Chicago",
        "to_city": "Los Angeles",
        "airline": "United",
        "price": 320,
        "stops": 0,
        "layover": 0,
        "departure_time": "07:00 AM",
        "arrival_time": "09:30 AM",
        "duration": "4h 30m",
        "duration_minutes": 270,
        "date": "2026-04-21",
        "ticket_class": "Business"
    },
    {
        "id": 5,
        "from_city": "New York",
        "to_city": "Miami",
        "airline": "American Airlines",
        "price": 280,
        "stops": 1,
        "layover": 1,
        "departure_time": "01:00 PM",
        "arrival_time": "06:00 PM",
        "duration": "5h 00m",
        "duration_minutes": 300,
        "date": "2026-04-21",
        "ticket_class": "Economy"
    },
    {
        "id": 6,
        "from_city": "Boston",
        "to_city": "Seattle",
        "airline": "Alaska Airlines",
        "price": 390,
        "stops": 1,
        "layover": 3,
        "departure_time": "06:30 AM",
        "arrival_time": "12:30 PM",
        "duration": "8h 00m",
        "duration_minutes": 480,
        "date": "2026-04-22",
        "ticket_class": "Economy"
    },
    {
        "id": 7,
        "from_city": "Detroit",
        "to_city": "New York",
        "airline": "United",
        "price": 260,
        "stops": 0,
        "layover": 0,
        "departure_time": "03:00 PM",
        "arrival_time": "05:00 PM",
        "duration": "2h 00m",
        "duration_minutes": 120,
        "date": "2026-04-20",
        "ticket_class": "Business"
    },
    {
        "id": 8,
        "from_city": "Dallas",
        "to_city": "San Francisco",
        "airline": "Southwest",
        "price": 300,
        "stops": 1,
        "layover": 2,
        "departure_time": "11:00 AM",
        "arrival_time": "03:30 PM",
        "duration": "6h 30m",
        "duration_minutes": 390,
        "date": "2026-04-23",
        "ticket_class": "Economy"
    }
]

@app.route("/")
def home():
    return "Flight Cost Finder Backend Running"

@app.route("/flights", methods=["GET"])
def get_flights():
    from_city = request.args.get("from", "").strip()
    to_city = request.args.get("to", "").strip()
    travel_date = request.args.get("date", "").strip()
    max_price = request.args.get("max_price", "").strip()
    max_stops = request.args.get("max_stops", "").strip()
    max_layover = request.args.get("max_layover", "").strip()

    results = flights

    if from_city:
        results = [f for f in results if f["from_city"].lower() == from_city.lower()]

    if to_city:
        results = [f for f in results if f["to_city"].lower() == to_city.lower()]

    if travel_date:
        results = [f for f in results if f["date"] == travel_date]

    if max_price:
        results = [f for f in results if f["price"] <= int(max_price)]

    if max_stops:
        results = [f for f in results if f["stops"] <= int(max_stops)]

    if max_layover:
        results = [f for f in results if f["layover"] <= int(max_layover)]

    return jsonify(results)

if __name__ == "__main__":
   app.run(debug=True, port=5001)