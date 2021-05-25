"use strict"

require('dotenv').config();
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json')
const PORT = process.env.PORT
const cors = require('cors');
server.use(cors());

server.get('/', (req, res) => {
    res.send('home route')
})

server.get('/test', (req, res) => {
    let str = "test back end "
    res.send(str);
})

server.get('/dataTest', (req, res) => {
    res.send('weatherData')
})

var today = new Date();
// a methot from stack over flow  to show currint date and time 

class ForeCast {

    constructor(date) {

        date = today;
        description = ` low temp ${weatherData.data.low_temp}, max_temp ${weatherData.data.max_temp} with ${weatherData.data.description} wind spd ${weatherData.data.wind_spd} clouds ${weatherData.data.clouds} `;

    }
}

//http://localhost:3001/weather?city_name=Amman

server.get('/weather', (req, res) => {

    let cityitems = req.query.city_name;
    let cityData = weatherData.find(item => {

        if (item.city_name == cityitems) {

           let cityitem = new ForeCast(cityitems);

            return [item.lat, item.lon, item.city_name , cityitem];

        };


    });

    console.log(cityData);

    if (cityData) {

        res.send(cityData);

    } else if (!cityData) {
        res.status(500).send('we dont have this city');
    };

});

server.get('*', (req, res) => {
    res.status(500).send('Something went wrong');
});



server.listen(PORT, () => {
    console.log(`listen on Port ${PORT}`);
});