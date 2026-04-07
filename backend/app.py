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
        "layover": 2
    },
    {
        "id": 2,
        "from_city": "Detroit",
        "to_city": "Chicago",
        "airline": "United",
        "price": 180,
        "stops": 0,
        "layover": 0
    },
    {
        "id": 3,
        "from_city": "Chicago",
        "to_city": "Boston",
        "airline": "American Airlines",
        "price": 250,
        "stops": 1,
        "layover": 3
    },
    {
        "id": 4,
        "from_city": "New York",
        "to_city": "Los Angeles",
        "airline": "JetBlue",
        "price": 340,
        "stops": 1,
        "layover": 2
    },
    {
        "id": 5,
        "from_city": "Detroit",
        "to_city": "New York",
        "airline": "Spirit",
        "price": 150,
        "stops": 2,
        "layover": 4
    }
]

@app.route("/")
def home():
    return "Flight Cost Finder Backend Running"

@app.route("/flights", methods=["GET"])
def get_flights():
    from_city = request.args.get("from", "").strip()
    to_city = request.args.get("to", "").strip()
    max_price = request.args.get("max_price", "").strip()
    max_stops = request.args.get("max_stops", "").strip()
    max_layover = request.args.get("max_layover", "").strip()

    results = flights

    if from_city:
        results = [f for f in results if f["from_city"].lower() == from_city.lower()]

    if to_city:
        results = [f for f in results if f["to_city"].lower() == to_city.lower()]

    if max_price:
        results = [f for f in results if f["price"] <= int(max_price)]

    if max_stops:
        results = [f for f in results if f["stops"] <= int(max_stops)]

    if max_layover:
        results = [f for f in results if f["layover"] <= int(max_layover)]

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)