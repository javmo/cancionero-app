class LyricsPublish {
    constructor(songId, categoryId) {
        this.song = songId;
        this.category = categoryId;
    }

    toJson() {
        const dataJson = JSON.stringify({
            song: this.song,
            category: this.category
        })
        return dataJson;
    }
}

export default LyricsPublish;