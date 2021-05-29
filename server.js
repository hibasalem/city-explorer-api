"use strict"

require('dotenv').config();
const express = require('express');
const server = express();
const weatherData = require('./data/weather.json')
const PORT = process.env.PORT
// const PORT = 3001;

const cors = require('cors');
server.use(cors());
const axios = require('axios');

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

// http://localhost:3001/movies?city_name=Amman

server.get('/weather', weatherHandler)
server.get('/movies', moviesHandler)


function weatherHandler(req, res) {

    const weatherKey = process.env.WEATHER_API_KEY;
    let weatherCityName = req.query.city_name;
    const weatherBackUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityName}&key=${weatherKey}&days=4`;

    // const weatherBackUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=amman&key=6895fec7ffd8470b9a3a84543e88c858&days=4`;
    // let cityData = weatherData.find(item => {
    //     if (weatherCityName.toLowerCase() == item.city_name.toLowerCase()) {
    //         //    let cityItem = new ForeCast(cityItems);
    //         // return [item.lat, item.lon, item.city_name , cityitem];
    //         return item;
    //     };
    // })

    axios

        .get(weatherBackUrl)

        .then(result1 => {

            let forecastArr = result1.data.data.map(item => {
                return new ForeCast(item);
            })
            res.send(forecastArr);

        })
        .catch(error => {
            res.status(500).send(`error in weather data ${error}`);
        });

};

class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.averageVotes = item.vote_average;
        this.totalVotes = item.vote_count;
        this.popularity = item.popularity;
        this.releasedOn = item.release_date;
        if (item.poster_path){
            this.imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        }
    }
    
}
function moviesHandler(req, res) {

    const moviesKey = process.env.MOVIE_API_KEY;
    let movieCityName = req.query.city_name;

    const movieBackUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieCityName}`;
    // const movieBackUrl = `https://api.themoviedb.org/3/search/movie?api_key=aefc936944d4e56665365a9d25f6a976&query=Amman`;
    axios
        .get(movieBackUrl)
        .then(movieResult => {

            let moviesArr = movieResult.data.results.map(item => {
                return new Movie(item);
            })
            res.send(moviesArr);

        })
        .catch(error => {
            res.status(500).send(`error in movie data ${error}`);
        });

};

server.get('*', (req, res) => {
    res.status(404).send('Something went wrong');
});

server.listen(PORT, () => {
    console.log(`listen on Port ${PORT}`);
});