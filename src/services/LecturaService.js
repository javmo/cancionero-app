class GenreService {
    constructor() {
       // this.URI = 'http://localhost:3000/api/genres';
       this.URI = `${process.env.REACT_APP_API_URL}/genres`;
    }

    async getGenres() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const genres = await response.json()
        return genres;
    }

    async getGenre(genreId) {
        const response = await fetch(`${this.URI}/${genreId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        const genre = await response.json();
        return genre;
    }

    async postSong(genre) {
        console.log(genre, 'ANTES LOG');
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: genre
        });
        return await reponse.json();
    }

    async deleteSong(genreId) {
        const response = await fetch(`${this.URI}/${genreId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
    }

}
export default GenreService;