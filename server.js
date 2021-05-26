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

server.get('/dataTest', (req, res) => {
    res.send(weatherData)
})

class ForeCast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
        // this.description = ` low temp ${weatherData.data.low_temp}, max_temp ${weatherData.data.max_temp} with ${weatherData.data.description} wind spd ${weatherData.data.wind_spd} clouds ${weatherData.data.clouds} `;
    }
}

//http://localhost:3001/weather?city_name=Amman

server.get('/weather', (req, res) => {
    let cityName = req.query.city_name;
    let cityData = weatherData.find(item => {

        if (cityName.toLowerCase() == item.city_name.toLowerCase()) {
            //    let cityItem = new ForeCast(cityItems);
            // return [item.lat, item.lon, item.city_name , cityitem];
            return item;
        };
    })

    try {

        let forecasts = cityData.data.map(item => {
            return new ForeCast(item);
        })
        // return new Forecast(item);
        res.send(forecasts);
    } 
    catch {
        res.status(500).send('we dont have this city');
    };

});

server.get('*', (req, res) => {
    res.status(404).send('Something went wrong');
});



server.listen(PORT, () => {
    console.log(`listen on Port ${PORT}`);
});