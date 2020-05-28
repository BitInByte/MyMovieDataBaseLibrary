// Movie view

// Imports =====================================================
import { elements } from './base';

/*
* MOVIE VIEW CONTROLS
*/

// ===== private methods =====

// Render the markup to render the movie page
const renderMovieHTML = (title, released, director, imdbWebSite, rating, runtime, description, img, id) => {
    const markup = `
    <div class="movie-content animate__animated animate__fadeIn">
        <div class="movie-content--img">
           <!-- <img src="${img}" alt="${title}"> -->
        </div>
        <div class="movie-content--content">
            <div class="movie-content--title">
                <h1>${title}</h1>
            </div>
            <div class="movie-content--descr">
                <p>${description}</p>
            </div>
            <div class="movie-content--info">
                <span><i class="icon ion-ios-person"></i>${director}</span> <span><i class="icon ion-ios-time"></i>${runtime}</span> <span><i class="icon ion-ios-calendar"></i>${released}</span>
            </div>
            <div class="movie-content--stars">
                <!-- <i class="icon ion-ios-star"></i><i class="icon ion-ios-star"></i><i class="icon ion-ios-star"></i><i class="icon ion-ios-star-half"></i><i class="icon ion-ios-star-outline"></i> -->
            </div>
            <div class="movie-content--btn">
                <a class="movie-content--link" data-id="back">
                    <div class="btn btn-back">
                        BACK
                    </div>
                </a>

                <a class="btn-watched--insert" data-id="${id}">
                    <div class="btn btn-watched btn-watched--js">
                        <!-- <i class="icon ion-ios-checkmark-circle-outline"></i> -->
                        <!-- <i class="icon ion-ios-checkmark-circle"></i>  -->
                    </div>
                </a>
                
                <a href="${imdbWebSite}" target="_blank">
                    <div class="btn btn-imdb">
                        IMDB ${rating}/10
                    </div>
                </a>
            </div>

        </div>
    </div>
    `;

    elements.section.insertAdjacentHTML('afterbegin', markup);
}


// Render the image without img form
const renderImage = (img, title) => {
    if(img === "N/A"){
        const markup = `
        <div>
            <p>Sorry no image to present!</p>
        </div>
        `;
        document.querySelector('.movie-content--img').insertAdjacentHTML('afterbegin', markup);
    } else {
        const markup = `
            <img src="${img}" alt="${title}"></img>
        `;

        document.querySelector('.movie-content--img').insertAdjacentHTML('afterbegin', markup);
    }
}

// Function to rend the starts rating
const renderStars = (rating) => {

    // Stars to markup
    const fullStar = '<i class="icon ion-ios-star"></i>';
    const halfStar = '<i class="icon ion-ios-star-half"></i>';
    const emptyStar = '<i class="icon ion-ios-star-outline"></i>';

    // Imdb star convertion
    const starRating = String(rating/2).split(".");

    const star = parseInt(starRating[0]);
    const decimal = parseInt(starRating[1]);

    // markup
    let markup;
    let totalstars = 0;

    markup = fullStar.repeat(star);
    totalstars = star;
    if(decimal >= 5) {
        markup += halfStar;
        totalstars++;
    }

    // rest
    markup += emptyStar.repeat(5-totalstars);

    // render markup    
    document.querySelector('.movie-content--stars').insertAdjacentHTML('afterbegin', markup);



    
}

// Render the button when the movie is watched
const renderBtnWatched = () => {

    // markup
    const markup = `
        <i class="icon ion-ios-checkmark-circle"></i>
    `;

    // Remove the button already on the element
    document.querySelector('.btn-watched--js').innerHTML = "";

    // Render the new button
    document.querySelector('.btn-watched--js').insertAdjacentHTML('afterbegin', markup);
}


// Render the button when the movie is not watched
const renderBtnNotWatched = () => {

    // markup
    const markup = `
        <i class="icon ion-ios-checkmark-circle-outline"></i>
    `;

    // Remove the button already on the element
    document.querySelector('.btn-watched--js').innerHTML = "";

    // Render the new button
    document.querySelector('.btn-watched--js').insertAdjacentHTML('afterbegin', markup);
}

// ===== Public methods =====

// DOM MANIPULATIONS =====================================================
export const renderMovie = (data, type) => {
    // Call the private method to render the markup with selected data
    renderMovieHTML(data.title, data.released, data.director, data.imdbWebSite, data.rating, data.runtime, data.description, data.img, data.id);
    renderButton(type);
    renderImage(data.img, data.title);
    renderStars(data.rating);
}

export const renderButton = (type) => {
    // Call the render button method with the watch or not watch movie. It's selected by the type argument
    if(type === "+") {
        renderBtnWatched();
    } else {
        renderBtnNotWatched();
    }

}

export const cleanMovie = () => {
    // Clean the movie from the DOM
    elements.section.innerHTML = "";
}