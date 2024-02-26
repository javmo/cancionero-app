class SongService {
    constructor() {
     //   this.URI =  'http://localhost:3000/api/songs';
        this.URI =  `${process.env.REACT_APP_API_URL}/songs`;
    }

    async getSongs() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const songs = await response.json()
        return songs;
    }

    async getSong(songId) {
        const response = await fetch(`${this.URI}/${songId}`, {

        });
        const song = await response.json();
        return song;
    }

    async postSong(song) {
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: song
        });
        return await reponse.json();
    }

    async deleteSong(songId) {
        const response = await fetch(`${this.URI}/${songId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }

    async searchSongLike(songTitle) {
        console.log(songTitle);
        const response = await fetch(`${this.URI}/search/search?q=${songTitle}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }

    async getSongByLyricId(songId) {
        const response = await fetch(`${this.URI}/byLyric/${songId}`, {

        });
        const song = await response.json();
        return song;
    }

    async searchSongByLyrics(query) {
        const response = await fetch(`${this.URI}/search/byLyricText?q=${query}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }

}
export default SongService;