// Simple movie async query fetch

// Imports =====================================================
import axios from "axios";

// class MOVIE =====================================================
export default class Movie {

    // Constructor =====================================================
    constructor(id) {
        this.id = id;
    }

    // Async function fetching an API =====================================================
    async getMovie() {

        // Get proxy and key from an .env file
        const proxy = process.env.API_PROXY;
        const key = process.env.API_KEY;

        // Error handler
        try {

            // Results
            const result = await axios(`${proxy}http://www.omdbapi.com/?apikey=${key}&i=${this.id}&plot=full`);

            // Storing results to the object
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