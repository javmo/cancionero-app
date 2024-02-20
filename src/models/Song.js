import Genres from "./Genres";

class Song {
    constructor(title,[genres], lyric) {
        this.title = title;
        this.genres = genres;
        this.lyric = lyric;
    }

    toJson() {
        const dataJson = JSON.stringify({
            title: this.title,
            genres: this.genres,
            lyric: this.lyric
        })
        return dataJson;
    }
}

export default Song;