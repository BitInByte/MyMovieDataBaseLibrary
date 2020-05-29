// DOM elements
export const elements = {
    searchRequest: document.querySelector('.form-seach-request'),
    searchInput: document.querySelector('.form-search--input'),
    section: document.querySelector('.content'),
    watchedMovieTitle: document.querySelector('.watched-panel-message'),
    watchedMovieContainer: document.querySelector('.watched-panel--container'),
}

// Hash elements
export const hashValues = {
    back: "BACK"
}

// Event listener elements
export const eventsList = {
    movie: "single-movie--id",
    back: "movie-content--link",
    pageUp: "pagination--page-up",
    pageDown: "pagination--page-down",
    watchedBtn: "btn-watched--insert",
    watchedLink: "watched-panel-link",
    imgMovie: "movie-content--img",
}

// Render the loader
export const renderLoader = (parent) => {

    const markup = `
        <div class="loader--container animate__animated animate__fadeIn">
            <img src="vendors/img/svg-loaders/three-dots.svg" alt="Loader" class="loader--loader">
        </div>
        `;

    elements.section.insertAdjacentHTML("afterbegin", markup);
}

export const clearLoader = () => {

    // Removes the loader
    elements.section.innerHTML = "";

}