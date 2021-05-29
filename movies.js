const axios = require('axios');


let inMemory = {};


class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.averageVotes = item.vote_average;
        this.totalVotes = item.vote_count;
        this.popularity = item.popularity;
        this.releasedOn = item.release_date;
        if (item.poster_path) {
            this.imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        }
    }

}
function moviesHandler(req, res) {

    const moviesKey = process.env.MOVIE_API_KEY;
    let movieCityName = req.query.city_name;

    const movieBackUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${movieCityName}`;

    if (inMemory[movieCityName] !== undefined) {

        res.send(inMemory[movieCityName])

    } else {

        axios
            .get(movieBackUrl)
            .then(movieResult => {

                let moviesArr = movieResult.data.results.map(item => {
                    return new Movie(item);
                })
                res.send(moviesArr);

                inMemory[movieCityName] = moviesArr;
            })
            .catch(error => {
                res.status(500).send(`error in movie data ${error}`);
            });
    }

};

module.exports = moviesHandler;
