// Search view

// Imports =====================================================
import { elements } from './base';

/*
* SEACH VIEW CONTROLS
*/

// ===== private methods =====

// Render the markup to render the title
const renderTitle = (title) => {
    const markup = `<h1 class="section--movie-search message-movies-animation">Result's with the "${title}" keyword: </h1>
                        <div class="movies-container">`

    elements.section.insertAdjacentHTML('afterbegin', markup);

    const titleClass = document.querySelector('.message-movies-animation');
    titleClass.classList.add('animate__animated', 'animate__backInDown');
}

// Render the markup to render the movie
const renderMovie = (img, title, id) => {

    if(img === "N/A"){    
        const markup = `
        <div class="single-movie animate__animated animate__fadeIn">
            <a class="single-movie--id" data-id="${id}">
                <figure>
                    <p>Sorry no image to present!</p>
                    <figcaption>${title}</figcaption>
                </figure>
            </a>
        </div>
    `;

    document.querySelector('.movies-container').insertAdjacentHTML('afterbegin', markup);
    } else {
        const markup = `
            <div class="single-movie animate__animated animate__fadeIn">
                <a class="single-movie--id" data-id="${id}">
                    <figure>
                        <img src="${img}" alt="Deadpool" class="single-movie-img">
                        <figcaption>${title}</figcaption>
                    </figure>
                </a>
            </div>
    `;
    
    document.querySelector('.movies-container').insertAdjacentHTML('afterbegin', markup);
    }

   

    
} 

// Render the markup to render the buttons
const renderButtons = (currentPage, nextPage) => {    
    if (currentPage === 1) {
        const markup = `
        <div class="reset"></div>
            <div class="pagination">
                <a class="pagination--page-up" data-page="+">
                    <div class="btn btn-right">
                        Page ${currentPage + 1}
                        <i class="ion-ios-arrow-round-forward"></i>
                    </div>
                </a>
            </div>
        `;
    
        document.querySelector('.movies-container').insertAdjacentHTML('afterend', markup);
    }  else if(nextPage === 0) {
        const markup = `
        <div class="reset"></div>
            <div class="pagination">
            <a class="pagination--page-down" data-page="-">
                <div class="btn btn-left">
                    <i class="ion-ios-arrow-round-back"></i>
                    Page ${currentPage - 1}
                </div>
            </a>
            </div>
        `;
    
        document.querySelector('.movies-container').insertAdjacentHTML('afterend', markup);
    } else if (currentPage >= 1) {
        const markup = `
        <div class="reset"></div>
            <div class="pagination">
                <a class="pagination--page-up" data-page="+">
                    <div class="btn btn-right">
                        Page ${currentPage + 1}
                        <i class="ion-ios-arrow-round-forward"></i>
                    </div>
                </a>
                <a class="pagination--page-down" data-page="-">
                    <div class="btn btn-left">
                        <i class="ion-ios-arrow-round-back"></i>
                        Page ${currentPage - 1}
                    </div>
                </a>
            </div>
        `;
    
        document.querySelector('.movies-container').insertAdjacentHTML('afterend', markup);
    }
}



// ===== Public methods =====
// GETS =====================================================

// get value from the form
export const getInput = () => elements.searchInput.value;


// DOM MANIPULATIONS =====================================================

// clean the form
export const clearInput = () => elements.searchInput.value = '';

// DOM RENDERS =====================================================
export const renderResults = (data) => {
    // Render title
    renderTitle(data.query);

    // Render each result
    data.result.slice().reverse().forEach(e => {
        // Find the index on the array with a element value        
        renderMovie(e.Poster, e.Title, e.imdbID);
    });

    // Render pagination buttons
    renderButtons(data.currentPage, data.nextPage);
}

// Clean the DOM
export const cleanResults = () => elements.section.innerHTML = "";