// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5100;

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/weatherforecast';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Mongoose schema and model for weather data
const weatherDataSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  description: String,
  icon: String,
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

// Route to handle storing weather data
app.post('/api/weather', async (req, res) => {
  try {
    const { city, country, temperature, description, icon } = req.body;

    const weatherData = new WeatherData({
      city,
      country,
      temperature,
      description,
      icon,
    });

    await weatherData.save();

    res.json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});