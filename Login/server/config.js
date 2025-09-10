// server/config.js
require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/user',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here'
};