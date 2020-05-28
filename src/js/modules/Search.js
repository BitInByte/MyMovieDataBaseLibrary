import axios from "axios";

export default class Search {

    constructor(query) {
        this.query = query;
        this.currentPage = 1;
    }

    async getSearch() {

        // Get the proxy url from the .env file
        const proxy = process.env.API_PROXY;

        // Get the API key from the .env file
        const key = process.env.API_KEY;
        const type = 'movie';
        

        try {
            
            const result = await axios(`${proxy}http://www.omdbapi.com/?apikey=${key}&s=${this.query}&type=${type}&page=${this.currentPage}`);
            this.result = result.data.Search;
            this.totalPages = parseInt(result.data.totalResults);


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

    changePage(type) {
        if (type === "+"){
            this.currentPage++;
        } else {
            this.currentPage--;
        }
        
    }
}