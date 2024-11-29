//server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5050;

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI
/*
const WEATHER = 'mongodb://localhost:27017/weatherforecast';
const USER = 'mongodb://localhost:27017/user';
mongoose.connect(WEATHER, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(USER, { useNewUrlParser: true, useUnifiedTopology: true });*/

// Connect to the weather database 
const weatherDB = mongoose.createConnection('mongodb://localhost:27017/weatherforecast', { useNewUrlParser: true, useUnifiedTopology: true }); 
// Connect to the user database 
const userDB = mongoose.createConnection('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

// Create a Mongoose model for weather data
const WeatherData = weatherDB.model('WeatherData', {
  city: String,
  country: String,
  temperature: Number,
  description: String,
  icon: String,
});

const UserData = new mongoose.Schema ({
  username: String,
  password: String,
});

const userdatas = userDB.model('userdatas', UserData);
const users = userDB.model('users', UserData);

// async function moveDocuments() {
//   try{
//     const docs = await users.find().lean(); //get data from wrong collection
//     await userdatas.create(docs); //move to correct collection
//     await users.deleteMany({});
//     console.log('Removed successfully'); //Prompt to notify successful movement
//   } catch (error) {
//     console.error('Error, cannot move collection:', error);
//   }
// } 

async function moveDocuments() {
  try {
    const docs = await users.find().lean(); // Get data from `users`

    for (const doc of docs) {
      // Skip documents where the username is "admin"
      if (doc.username === "admin") {
        console.log(`Skipped document with username: admin`);
        continue;
      }

      // Check if a document with the same `username` already exists in `userdatas`
      const exists = await userdatas.findOne({ username: doc.username });

      if (!exists) {
        await userdatas.create(doc); // Move the document to `userdatas` if not duplicate
        console.log(`Moved document with username: ${doc.username}`);
      } else {
        console.log(`Skipped duplicate document with username: ${doc.username}`);
      }
    }

    console.log('Document transfer completed.');
  } catch (error) {
    console.error('Error moving documents:', error);
  }
}




moveDocuments();

// Route to handle storing weather data
app.post('/api/weather', async (req, res) => {
  try {
    // Extract weather data from request body
    const { city, country, temperature, description, icon } = req.body;

    // Create a new document using the WeatherData model
    const weatherData = new WeatherData({
      city,
      country,
      temperature,
      description,
      icon,
    });

    // Save the weather data to the database
    await weatherData.save();

    // Respond with success message
    res.json({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route in your server/index.js
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await WeatherData.find();
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*app.post('/api/users', async (req, res) => {
  try {
    // Extract weather data from request body
    const { username, password } = req.body;

    // Create a new document using the WeatherData model
    const userData = new UserData({
      username,
      password,
    });

    // Save the weather data to the database
    await userData.save();

    // Respond with success message
    res.json({ message: 'User data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

app.get('/api/users', async (req, res) => {
  try {
    const userData = await userdatas.find();
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create API endpoint to fetch total searches
app.get('/api/total-searches', async (req, res) => {
  const weatherDataCount = await WeatherData.countDocuments();
  res.json({ totalSearches: weatherDataCount });
});

// Create API endpoint to fetch total users
app.get('/api/total-users', async (req, res) => {
  const userDataCount = await userdatas.countDocuments();
  res.json({ totalUsers: userDataCount });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


