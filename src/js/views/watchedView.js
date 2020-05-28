import { elements } from './base';

const renderTitle = (uptime, time) => {

    if (time === 0) {
        const markup = `
            <h2>You didn't watched movies yet!</h2>
        `;

       elements.watchedMovieTitle.insertAdjacentHTML('afterbegin', markup);
    } else {
        const markup = `
            <h2>You have watched ${uptime[0]} day/s, ${uptime[1]} hour/s and ${uptime[2]} minutes!</h2>
        `;

        elements.watchedMovieTitle.insertAdjacentHTML('afterbegin', markup);
    }

    
}


const renderMarkup = (id, img, title) => {

    if(img === "N/A") {

        const markup = `
        <a href="#" class="watched-panel-link" data-id=${id}>
            <div class="watched-panel--movie-container">
                <div class="watched-panel--movie">
                    
                        <div class="watched-panel-movie-img">
                            <img src="${img}" alt="N/A">
                        </div>
                        <div class="watched-panel-movie-title">
                            <p>${title}</p>
                        </div>
                    
                </div>    
            </div>
        </a>
        `;

        elements.watchedMovieContainer.insertAdjacentHTML('afterbegin', markup);

    } else {
        const markup = `
        <a href="#" class="watched-panel-link" data-id=${id}>
            <div class="watched-panel--movie-container">
                <div class="watched-panel--movie">
                    
                        <div class="watched-panel-movie-img">
                            <img src="${img}" alt="${title}">
                        </div>
                        <div class="watched-panel-movie-title">
                            <p>${title}</p>
                        </div>
                    
                </div>    
            </div>
        </a>
        `;

        elements.watchedMovieContainer.insertAdjacentHTML('afterbegin', markup);

    }
}

// const renderImg = (img, title) => {

// }

export const convertTime = (uptime) => {
    // Function to divide the minutes into days, hours and minutes

    // Divide the minutes into hours
    const time = String(uptime / 60).split(".");

    // Convert the last array from string to int
    let arrTime = time.map(e => parseInt(e));
    
    // Add the day to the array
    arrTime.unshift(0);

    // If the minutes is more than 24 then add 1 more day and decrease 24 hours
    if(arrTime[1] >= 24) {
        arrTime[0] += 1;
        arrTime[1] -= 24;
    }

    // Convert the minutes percentage into time again    
    arrTime[2] = (arrTime[2]/100) * 60;

    // Remove the weird js bug of the decimal cases
    const len = (""+arrTime[2]).split("").length;
    const total = ("0").repeat(len-2);
    const reduce = "1" + total;    
    if (len > 2) {
        arrTime[2] = Math.floor(arrTime[2] / parseInt(reduce).toFixed(0));
    }


    // Return the array
    return arrTime;
    
    // TODO check this
    
    
}

export const renderResults = (data) => {

    // Clean title and container
    cleanResults();

    // Render Title
    renderTitle(convertTime(data.totalTimeWatched), data.totalTimeWatched);

    // Render the movies
    data.movies.slice().reverse().forEach(e => {
        renderMarkup(e.imdbId, e.img, e.title);
    });  
}

export const cleanResults = () => {

    // Clean title
    elements.watchedMovieTitle.innerHTML = "";
    
    // Clean movie container
    elements.watchedMovieContainer.innerHTML = "";
    
}

export const cleanResultsContainer = () => elements.section.innerHTML = "";