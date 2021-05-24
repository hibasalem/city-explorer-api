"use strict"

require('dotenv').config();
const { response } = require('express');
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json')

const PORT = 3001;

server.get('/', (req, res) => {
    res.status(200).res.send('home route')
})

server.get('/test', (req, res) => {
    let str = "test back end "
    res.send(str);
})

server.get('/dataTest', (req, res) => {
    res.send('weatherData')
})


//http://localhost:3001/weather?city_name=Amman

server.get('/weather', (req, res) => {

    let cityitem = req.query.city_name;
    let cityData = weatherData.find(item => {

        if (item.city_name == cityitem) {
            return [item.lat, item.lon, item.city_name];
        };

    });

    if (cityData) {
        res.send(cityData);
    } else if (!cityData) {
        res.status(500).send('Something went wrong');
    };

});

server.get('*', (req, res) => {
    res.status(500).send('Something went wrong');
});

server.listen(PORT, () => {
    console.log(`listen on Port ${PORT}`);
});