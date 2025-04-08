import joblib
import requests
import pandas as pd

# Load acceptance model 
model_path = "acceptance_score_model.pkl"
model = joblib.load(model_path)

# API keys (replace with env variables in production)
GOOGLE_API_KEY = "AIzaSyDgKht7QFWBJZs8keoLq3E31vgfC8orOzE"
WEATHER_API_KEY = "749565be7f3b1fbb8f5276a513b2b4b6"

def get_weather_condition(lat, lon):
    """Fetch weather condition from OpenWeatherMap API."""
    url = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}"
    response = requests.get(url).json()
    return response.get("weather", [{"main": "Clear"}])[0]["main"]

def get_trip_distance(origin, destination):
    """Fetch estimated trip distance from Google Maps API."""
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin[0]},{origin[1]}&destinations={destination[0]},{destination[1]}&key={GOOGLE_API_KEY}"
    response = requests.get(url).json()
    return response["rows"][0]["elements"][0].get("distance", {}).get("value", 0) / 1000  # km

def predict_acceptance_probability(source, destination):
    """Predicts acceptance probability using trained model."""
    weather = get_weather_condition(source[0], source[1])
    distance = get_trip_distance(source, destination)

    df = pd.DataFrame([{
        "service_type": "Auto",
        "weather_condition": weather,
        "distance_to_pickup_km": 2,
        "estimated_trip_distance_km": distance,
        "traffic_congestion_level": 5
    }])

    prob = model.predict_proba(df)[:, 1][0]
    return {"acceptance_probability": prob}
