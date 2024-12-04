// server/createAdmin.js
const mongoose = require('mongoose');
const config = require('./config');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        createAdminUser();
    })
    .catch(err => console.error(err));

function createAdminUser() {
    readline.question('Enter admin username: ', username => {
        readline.question('Enter admin password: ', password => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;

                    const newAdmin = new Admin({
                        username: username,
                        password: hash
                    });

                    try {
                        await newAdmin.save();
                        console.log('Admin user created successfully');
                        readline.close();
                        mongoose.connection.close();
                    } catch (err) {
                        console.error(err.message);
                        readline.close();
                        mongoose.connection.close();
                    }
                });
            });
        });
    });
}