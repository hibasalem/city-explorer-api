"use strict"

require('dotenv').config();
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json')
const PORT = process.env.PORT
const cors = require('cors');
server.use(cors());
const axios = require('axios');


const weather = require('./weather.js');
const movies = require('./movies.js');


server.get('/', (req, res) => {
    res.send('home route')
})

server.get('/dataTest', (req, res) => {
    res.send(weatherData)
})

server.get('/weather', weather)
server.get('/movies', movies)

// http://localhost:3001/movies?city_name=Amman

server.get('*', (req, res) => {
    res.status(404).send('Something went wrong');
});

server.listen(PORT, () => {
    console.log(`listen on Port ${PORT}`);
});