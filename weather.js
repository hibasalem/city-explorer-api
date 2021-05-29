const axios = require('axios');

class ForeCast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}

function weatherHandler(req, res) {

    const weatherKey = process.env.WEATHER_API_KEY;
    let weatherCityName = req.query.city_name;
    const weatherBackUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCityName}&key=${weatherKey}&days=4`;

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
}


module.exports = weatherHandler;
