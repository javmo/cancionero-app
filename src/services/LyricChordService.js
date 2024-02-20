class LyricChordService {
    constructor() {
        //  this.URI =  'http://localhost:3000/api/lyricschord';
        this.URI =  `${process.env.REACT_APP_API_URL}/lyricschord`;
    }

    async getLyricsChord() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const lyricChords = await response.json()
        return lyricChords;
    }

    async getLyricChordBySong(songId) {
        const response = await fetch(`${this.URI}/bysongid?songId=${songId}`, {

        });
        const lyricChord = await response.json();
        return lyricChord;
    }

    async postLyric(lyricChord) {
        console.log(lyricChord, 'ANTES LOG');
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(lyricChord)
        });
        const data = await reponse.json();
    }

    async updateLyricChord(lyricChord) {
        const response = await fetch(`${this.URI}/${lyricChord._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(lyricChord)
        });
        return await response.json();
    }

    async deleteLyric(lyricChordId) {
        const response = await fetch(`${this.URI}/${lyricChordId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
    }

}
export default LyricChordService;