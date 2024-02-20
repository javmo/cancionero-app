class LyricPublishService {
    constructor() {
      //  this.URI = 'http://localhost:3000/api/lyricsPublish';
        this.URI = `${process.env.REACT_APP_API_URL}/lyricsPublish`;
    }

    async getLyricsPublish() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const lyricsPub = await response.json()
        return lyricsPub;
    }

    async postLyricPublish(lyricPub) {
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: lyricPub
        });
        return await reponse.json();
    }

    async deleteLyricPublish(lyricPubId) {
        const response = await fetch(`${this.URI}/${lyricPubId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
    }

    async getLyricPublish(lyricPubId) {
        const response = await fetch(`${this.URI}/${lyricPubId}`, {

        });
        const lyricPub = await response.json();
        return lyricPub;
    }

    async updateLyricPub(lyricPub) {
        const response = await fetch(`${this.URI}/${lyricPub._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(lyricPub)
        });
        return await response.json();
    }

}
export default LyricPublishService;