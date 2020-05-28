// Search async query fetch

// Imports =====================================================
import axios from "axios";

// class MOVIE =====================================================
export default class Search {

    // Constructor =====================================================
    constructor(query) {
        this.query = query;
        this.currentPage = 1;
    }

    // Async function fetching an API =====================================================
    async getSearch() {

        // Get the proxy url from the .env file
        const proxy = process.env.API_PROXY;

        // Get the API key from the .env file
        const key = process.env.API_KEY;
        
        // Type of query
        const type = 'movie';

        // Error handler
        try {
            
            // Results
            const result = await axios(`${proxy}http://www.omdbapi.com/?apikey=${key}&s=${this.query}&type=${type}&page=${this.currentPage}`);

            // Storing results to the object
            this.result = result.data.Search;
            this.totalPages = parseInt(result.data.totalResults);

            // Action to perform the last page button. 
            if(this.totalPages/10 <= this.currentPage){
                this.nextPage = 0;
            } else {
                this.nextPage = 1;
            }
            
        } catch (error) {
            console.log(error);
            alert(error);
            
        }
    }

    // Current page changer
    changePage(type) {
        if (type === "+"){
            this.currentPage++;
        } else {
            this.currentPage--;
        }
        
    }
}