'use strict';

// Variable to store the API key
export let apiKey = '';

// Function to fetch the API key from apikey.txt
export function getApiKey() {
  return new Promise((resolve, reject) => {
    if (apiKey !== '') {
      // API key is already fetched
      resolve(apiKey);
    } else {
      fetch('../../API/apikey.txt') // Adjust the path based on your project structure
        .then(response => response.text())
        .then(text => {
          apiKey = text.trim();
          resolve(apiKey);
        })
        .catch(error => {
          console.error('Error fetching API key:', error);
          reject(error);
        });
    }
  });
}

/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback callback
 */


export const fetchData = function (URL, callback) {
  getApiKey()
    .then(apiKey => {
      fetch(`${URL}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching API key:', error);
    });
}

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
  },
  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
  },
  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
  },
  /**
   * @param {string} query Search query e.g.: "London", "New York"
   */
  geo(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
  }
}
