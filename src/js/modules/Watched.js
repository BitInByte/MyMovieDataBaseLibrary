export default class Watched {
    constructor () {
        this.movies = [];
        this.totalTimeWatched = 0;
    }

    insertNewMovie(id, title, img, uptime) {
        this.movies.push({
            imdbId: id,
            title: title,
            img: img,
        })

        
        this.totalTimeWatched += this.convertUpTimeToInt(this.checkString(uptime));

        // Call data Persintent
        this.saveData();
    }

    removeNewMovie(id, uptime) {

        this.movies.splice(id, 1);

        this.totalTimeWatched -= this.convertUpTimeToInt(this.checkString(uptime));

         // Call data Persintent
         this.saveData();        
    }
    
    convertUpTimeToInt(data) {
        const divided = String(data).split(" ");
        
        return parseInt(divided[0]);        
    }

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