// Global app controller

// IMPORT MODELS
import Search from './modules/Search';
import Movie from './modules/Movie';
import Watched from './modules/Watched';

// IMPORT VIEWS
import * as searchView from './views/searchView';
import * as movieView from './views/movieView';
import * as watchedView from './views/watchedView';

// IMPORT ELEMENTS
import { elements, renderLoader, clearLoader, eventsList } from './views/base';




// Objects container
const state = {};
window.state = state;

/*
* SEARCH CONTROLLER
*/

const controllerSearch = async (pagination = false) => {

    // Get the input from the form with a keyword to perform a search
    const query = searchView.getInput();
   
    // If user introduce something
    if (query) {

        // Clean the results to render the load
        searchView.cleanResults();

        // Render the load
        renderLoader(elements.searchRequest);
        
        // Create a new Search object
        state.search = new Search(query);
        searchView.clearInput();
        
        try {
            await state.search.getSearch();
            clearLoader();
            searchView.cleanResults();
            searchView.renderResults(state.search);
            // console.log(state.search);
        } catch (error) {
            console.log(error);
        }

    } else if(pagination){

         // Clean the results to render the load
         searchView.cleanResults();

        //  Render the load
        renderLoader(elements.searchRequest);

        try {
            await state.search.getSearch();
            clearLoader();
            searchView.cleanResults();
            searchView.renderResults(state.search);
            // console.log(state.search);
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Insert a movie on the search box!');
    }
};

/*
* MOVIE CONTROLLER
*/

const controllerMovie = async (id) => {
    // Get's the id from the URL with a hash
    // const id = window.location.hash.replace("#", "");
    // history.pushState("", document.title, window.location.pathname);
    
    

    // Check if the URL have an id or not
    if (id) {

        // Create a new empty Movie object
        state.movie = new Movie(id);        
        
        // Clear the search results
        searchView.cleanResults();

        // Start the loader
        renderLoader(elements.searchRequest);

        // Try to get async querys
        try {
            // Fetch the data and store it to the Movie object
            await state.movie.getMovie();

            // Clear loader after await done
            clearLoader();

            // Check if the movie is already on the watched list
            if(!state.watched || state.watched.movies.findIndex(el => el.imdbId === state.movie.id) === -1) {
                // Render the new markup with the button not watched
                movieView.renderMovie(state.movie, "-");
                // console.log("-");
                
            } else {
                // Render the new markup with the button watched
                movieView.renderMovie(state.movie, "+");
                // console.log("+");
                
            }

            

        } catch (error) {
            alert(error);
            console.log(error);
        }
    } else {
        alert('Select a movie!');
   }
    
}

/*
* WATCHED CONTROLLER
*/

const watchedController = () => {

    // if the watched object is not on the state object, then create it
    if(!state.watched) state.watched = new Watched();

    // Check if the movie already exists
    const isAlready = state.watched.movies.findIndex(el => el.imdbId === state.movie.id);    

    
    if(isAlready !== -1) {
        const id = state.watched.movies.findIndex(el => el.imdbId === state.movie.id);
        // console.log("remove");
        
        // Remove a movie on the object state.watched
        state.watched.removeNewMovie(id, state.movie.runtime);

        // Clean the previous results
        watchedView.cleanResults();

        // Render the new results
        watchedView.renderResults(state.watched);

        // Change the button to add
        movieView.renderButton("-");

    } else {
        // console.log("add");
        // Insert a movie on the object state.watched
        // id, title, img, uptime, isWatched
        state.watched.insertNewMovie(state.movie.id, state.movie.title, state.movie.img, state.movie.runtime);

        // Clean the previous results
        watchedView.cleanResults();

        // Render the new results
        watchedView.renderResults(state.watched);

        // Change the button to remove
        movieView.renderButton("+");
        
    }


}

/*
* INIT
*/
const init = () => {
      // Create a new watched object on the state object
      state.watched = new Watched();

      // Read the data on the localStorage if exist
      state.watched.getData();
  
        //   Render the movies list
        watchedView.renderResults(state.watched);

    }

    // console.log(process.env.API_KEY);
    // console.log(process.env.API_PROXY);
    

/*
* EVENT LISTENER
*/

document.addEventListener('click', (e) => {
    // Event listener to ghost elements, elements that are not on the document after load
    // const query = e.target.parentNode.parentNode.className;
    // const backQuery = e.target.parentNode.className;    
    
    // console.log(btnQuery);
    
    try{

        const query = e.target.closest("a").className;

    if (query === eventsList.movie) {
        // const id = e.target.parentNode.parentNode.getAttribute("href").replace("#", "");
        const id = e.target.parentNode.parentNode.dataset.id;
        // console.log(id);
        
        // console.log(id);
        controllerMovie(id);
    } else if (query === eventsList.back) {
        //  Clean the movie HTML
        movieView.cleanMovie();

        // Render the results of the search
        searchView.renderResults(state.search);
    } else if (query === eventsList.pageUp) {
        // Check if the event cames from the pagination buttons

        // Clean last results
        searchView.cleanResults();

        // Change the current page
        state.search.changePage("+");

        // Call the controllerSearch but this time only to change the results page
        controllerSearch(true);
        
    } else if (query === eventsList.pageDown){
        // Check if the event cames from the pagination buttons

        // Clean last results
        searchView.cleanResults();

        // Change the current page
        state.search.changePage("-");

        // Call the controllerSearch but this time only to change the results page
        controllerSearch(true);
    } else if (query === eventsList.watchedBtn) {
        // Add a new movie or remove from the watched list
        
        
        
        watchedController();
        // console.log(state.movie.runtime);
        // watchedView.convertTime(state.watched.totalTimeWatched);
    } else if (query === eventsList.watchedLink) {
        const id = e.target.closest("a").dataset.id;
        // console.log(id);

        // Clean the results
        watchedView.cleanResultsContainer();

        // Render the movie
        controllerMovie(id);
        
    }
} catch (error) {
    // console.log(error);
    
}

    // TODO Fix the static method of getting the data from the a tag - solution - closest
    // TODO pagination could be improved in time
    // TODO convert this else if in switch
});


document.addEventListener('submit', e => {
    e.preventDefault();
    controllerSearch();
});

// window.addEventListener("hashchange", () => {

//     // get the hash value
//     const hash = window.location.hash.replace("#", "");
    
//     // If the hash value is equal to the value on the elements for the back button then...
//     if (hash === hashValues.back) {

//         // Clean the movie HTML
//         movieView.cleanMovie();

//         // Render the results of the search
//         searchView.renderResults(state.search);
//     } else {

//         controllerMovie();
//     }
    
    
// });

// Add eventListener on load of the browser
window.addEventListener("load", init );