// class WATCHED =====================================================
export default class Watched {

    // Constructor =====================================================
    constructor () {
        this.movies = [];
        this.totalTimeWatched = 0;
    }

    // Insert new movie on the watched list object
    insertNewMovie(id, title, img, uptime) {
        this.movies.push({
            imdbId: id,
            title: title,
            img: img,
        })

        // Add the movie runtime to the TotalTimeWatched object
        this.totalTimeWatched += this.convertUpTimeToInt(this.checkString(uptime));

        // Call data Persintent
        this.saveData();
    }

    // Remove the movie from the watched list object
    removeNewMovie(id, uptime) {

        // Remove the movie
        this.movies.splice(id, 1);

        // Remove the uptime from the TotaTimeWatched
        this.totalTimeWatched -= this.convertUpTimeToInt(this.checkString(uptime));

         // Call data Persintent
         this.saveData();        
    }
    
    // Convert the time that is a string into int
    convertUpTimeToInt(data) {

        // Remove the min string from the uptime
        const divided = String(data).split(" ");
        
        // Return the runtime int object
        return parseInt(divided[0]);        
    }

    // Check if the runtime have time or not
    checkString(data) {
        if(data === "N/A"){
            return 0;
        } else {
            return data;
        }
    }

    // Persistent Data on the localStorage
    saveData() {

        // Convert movies JS objet into JSON
        localStorage.setItem('movies', JSON.stringify(this.movies));

        // Convert upTime JS objet into JSON
        localStorage.setItem('uptime', JSON.stringify(this.totalTimeWatched));

    }

    // Get the persistent Data from the localStorage
    getData() {

        // Convert JSON into JS object
        const movies = JSON.parse(localStorage.getItem('movies'));
        const uptime = JSON.parse(localStorage.getItem('uptime'));

        // Check if exists data on the localStorage
        if (movies) this.movies = movies;
        if (uptime) this.totalTimeWatched = uptime;

    }

}