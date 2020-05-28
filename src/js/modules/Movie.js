import axios from "axios";

export default class Movie {
    constructor(id) {
        this.id = id;
    }

    async getMovie() {
        // const proxy = 'https://cors-anywhere.herokuapp.com/';
        // const key = '460a78c7';
        const proxy = process.env.API_PROXY;
        const key = process.env.API_KEY;

        try {

            const result = await axios(`${proxy}http://www.omdbapi.com/?apikey=${key}&i=${this.id}&plot=full`);
            // console.log(result);
            this.title = result.data.Title;
            this.year = result.data.Year;
            this.runtime = result.data.Runtime;
            this.released = result.data.Released;
            this.director = result.data.Director;
            this.rating = result.data.imdbRating;
            this.img = result.data.Poster;
            this.imdbId = result.data.imdbID;
            this.imdbWebSite = `https://www.imdb.com/title/${this.imdbId}`;
            this.description = result.data.Plot;


        } catch(error) {
            alert(error);
            console.log(error);
        }
    }
}