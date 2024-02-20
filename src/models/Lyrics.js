class Lyric {
    constructor(text) {
        this.text = text;
    }

    toJson() {
        const dataJson = JSON.stringify({
            text: this.text
        })
        return dataJson;
    }
}

export default Lyric;