//src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 


function App() {
  const [apiKey, setApiKey] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch the API key from the apikey.txt file
    fetch('../API/apikey.txt')
      .then(response => response.text())
      .then(text => {
        setApiKey(text.trim());
        // After setting the API key, fetch the initial weather data
        getCurrentLocationWeather(text.trim());
      })
      .catch(error => {
        console.error('Error fetching API key:', error);
      });
  }, []);

  const getCurrentLocationWeather = (apiKey) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        fetchWeatherData(url, apiKey);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeatherData = async (url, apiKey) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      weatherReport(data, apiKey);
      setWeatherData(data);
      // Send data to backend for storage
      saveWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const searchByCity = async () => {
    if (!apiKey) {
      console.error('API key is not loaded yet.');
      return;
    }
    try {
      const urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await axios.get(urlsearch);
      const data = response.data;
      console.log(data);
      weatherReport(data, apiKey);
      setWeatherData(data);
      // Send data to backend for storage
      saveWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setCity('');
  };

  const weatherReport = async (data, apiKey) => {
    const urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}`;
    try {
      const response = await axios.get(urlcast);
      const forecast = response.data;
      console.log(forecast.city);
      hourForecast(forecast);
      dayForecast(forecast);

      console.log(data);
      document.getElementById('city').innerText = `${data.name}, ${data.sys.country}`;
      console.log(data.name, data.sys.country);

      console.log(Math.floor(data.main.temp - 273));
      document.getElementById('temperature').innerText = `${Math.floor(data.main.temp - 273)} °C`;

      document.getElementById('clouds').innerText = data.weather[0].description;
      console.log(data.weather[0].description);

      let icon1 = data.weather[0].icon;
      let iconurl = `https://openweathermap.org/img/w/${icon1}.png`;
      document.getElementById('img').src = iconurl;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const hourForecast = (forecast) => {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
      var date = new Date(forecast.list[i].dt * 1000);
      console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''));

      let hourR = document.createElement('div');
      hourR.setAttribute('class', 'next');

      let div = document.createElement('div');
      let time = document.createElement('p');
      time.setAttribute('class', 'time');
      time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

      let temp = document.createElement('p');
      temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

      div.appendChild(time);
      div.appendChild(temp);

      let desc = document.createElement('p');
      desc.setAttribute('class', 'desc');
      desc.innerText = forecast.list[i].weather[0].description;

      hourR.appendChild(div);
      hourR.appendChild(desc);
      document.querySelector('.templist').appendChild(hourR);
    }
  };

  const dayForecast = (forecast) => {
    document.querySelector('.weekF').innerHTML = '';
    for (let i = 8; i < forecast.list.length; i += 8) {
      console.log(forecast.list[i]);
      let div = document.createElement('div');
      div.setAttribute('class', 'dayF');

      let day = document.createElement('p');
      day.setAttribute('class', 'date');
      day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
      div.appendChild(day);

      let temp = document.createElement('p');
      temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
      div.appendChild(temp);

      let description = document.createElement('p');
      description.setAttribute('class', 'desc');
      description.innerText = forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector('.weekF').appendChild(div);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>WEATHER APP</h1>
        <div>
          <input
            type="text"
            name=""
            id="input"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button id="search" onClick={searchByCity}>
            Search
          </button>
        </div>
      </div>

      <main>
        <div className="weather">
          <h2 id="city">Delhi,IN</h2>
          <div className="temp-box">
            <img src="/weathericon.png" alt="" id="img" />
            <p id="temperature">26 °C</p>
          </div>
          <span id="clouds">Broken Clouds</span>
        </div>
        <div className="divider1"></div>

        <div className="forecstH">
          <p className="cast-header">Upcoming forecast</p>
          <div className="templist">
            {/* Hourly forecast will be rendered here */}
          </div>
        </div>
      </main>

      <div className="forecstD">
        <div className="divider2"></div>
        <p className="cast-header"> Next 4 days forecast</p>
        <div className="weekF">
          {/* Daily forecast will be rendered here */}
        </div>
      </div>
    </div>
  );
}

export default App;