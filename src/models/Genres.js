class Genres {
    constructor(name) {
        this.name = name;
    }

    toJson() {
        const dataJson = JSON.stringify({
             name: this.name
        })
        return dataJson;
    }
}

export default Genres;