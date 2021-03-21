const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

// Connect to database
mongoose.connect(config.database)

mongoose.connection.on('connected', () => {
    console.log(`connected to database ${config.database}`)
})

mongoose.connection.on('error', (err) => {
    console.log(`error connecting to database: ${err}`)
})

const app = express();

const users = require('./routes/users')

// Port Number
const port = 8080;

// CORS Middleware
app.use(cors());

// Set Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Request Parser
app.use(express.json())

// Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// Routes
app.use('/users', users);


// Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint')
})

// Start Server
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})