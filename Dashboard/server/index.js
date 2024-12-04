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
const weatherDB = mongoose.createConnection('mongodb+srv://admin:4dm1n@cluster0.fsnmw.mongodb.net/weatherforecast', { useNewUrlParser: true, useUnifiedTopology: true }); 
// Connect to the user database 
const userDB = mongoose.createConnection('mongodb+srv://admin:4dm1n@cluster0.fsnmw.mongodb.net/user', { useNewUrlParser: true, useUnifiedTopology: true });

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
  try {
    // Count the total number of weather data entries
    const totalSearchesCount = await WeatherData.countDocuments();

    // Send the count as a JSON response
    res.json({ totalSearches: totalSearchesCount });
  } catch (error) {
    console.error('Error fetching total searches:', error);
    res.status(500).json({ error: 'Failed to fetch total searches' });
  }
});

// Create API endpoint to fetch total users
app.get('/api/total-users', async (req, res) => {
  const userDataCount = await userdatas.countDocuments();
  res.json({ totalUsers: userDataCount });
});


// Route to handle updating weather data
app.put('/api/weather/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Update the weather data in the database
    const result = await WeatherData.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    res.json({ message: 'Weather data updated successfully', data: result });
  } catch (error) {
    console.error('Error updating weather data:', error);
    res.status(500).json({ error: 'Failed to update weather data' });
  }
});

// Route to handle deleting weather data
app.delete('/api/weather/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the weather data from the database
    const result = await WeatherData.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Weather data not found' });
    }

    res.json({ message: 'Weather data deleted successfully' });
  } catch (error) {
    console.error('Error deleting weather data:', error);
    res.status(500).json({ error: 'Failed to delete weather data' });
  }
});

// Route to get total number of searches
app.get('/api/total-searches', async (req, res) => {
  try {
    // Count the total number of weather data entries
    const totalSearchesCount = await WeatherData.countDocuments();

    // Send the count as a JSON response
    res.json({ totalSearches: totalSearchesCount });
  } catch (error) {
    console.error('Error fetching total searches:', error);
    res.status(500).json({ error: 'Failed to fetch total searches' });
  }
});

// Route to handle deleting user data
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Use the correct Model corresponding to your collection
    const result = await userdatas.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'User data not found' });
    }

    res.json({ message: 'User data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    res.status(500).json({ error: 'Failed to delete user data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


