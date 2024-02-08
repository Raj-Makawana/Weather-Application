from typing import Dict
from fastapi import FastAPI, HTTPException, Path, Query
from hardcoded_data import continent_list
from pydantic import BaseModel
import requests

app = FastAPI()
# city = input("Enter desired city : ")
API_KEY = "ce1be55960be4b13bb9132114242301"


@app.get('/')
def index():
    return "Hello. This is a weather report."


@app.get('/path')
def path():
    return {"message": "This is another path to view my weather report website"}


@app.get('/weather/{continent}')
def get_weather_continent(continent: str = Path(..., title="Continent", regex="^[a-zA-Z]+$")):
    if continent in continent_list:
        return {"message": f"This is for the {continent} continent weather information"}
    else:
        raise HTTPException(status_code=404, detail={"continent_validity": "There's no such continent like this."})


class Model(BaseModel):
    city: str


@app.get('/actual-weather')
def get_actual_data(city: str = Query(..., title="City", description="Enter the city name")):
    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=yes"
    return requests.get(url).json()
