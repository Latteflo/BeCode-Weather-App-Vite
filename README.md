# Weather Application

This project is a weather application that allows users to search for current weather data for any city, as well as retrieve weather data based on their current geolocation.

## Features

* Search for weather data by city name.
* Auto-location detection to fetch weather data for the current location.
* Display of weather data including temperature, humidity, wind speed, UV index, and weather description.
* Dynamic weather icons that change based on the weather conditions.
* A history of recent searches.
* Ability to clear search history.

## How It Works

This application uses the OpenWeatherMap API to fetch current weather data for the specified location. It also uses the OpenCage Geocoder API to reverse geocode latitude and longitude coordinates into a city name when the user chooses to use their current location.

The front end is built with HTML, CSS, and JavaScript. The JavaScript manages all the interactions with the API, updates the DOM to display the data, and manages local storage for the search history.

## Usage

1. Enter a city name in the search box and press Enter or click the search button to fetch the weather data for that city.
2. Click on the location button to fetch the weather data for your current location (requires the user to allow location access).
3. The clear button clears all the data from the screen and the search history from local storage.

## [Check it here!](https://becode-weather-app-fs.vercel.app/)

## Preview

![Alt text](public/pre.gif)
