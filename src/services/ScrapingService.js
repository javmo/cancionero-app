class ScrapingService {
    constructor() {
        //   this.URI =  'http://localhost:3000/api/scraping';
        this.URI =  `${process.env.REACT_APP_API_URL}/scraping`;
    }

    async getSongPreview(url) {
        console.log(url);
        const response = await fetch(`${this.URI}/search?url=${url}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }

    async getlectura(url) {
        console.log(url);
        const response = await fetch(`${this.URI}/lectura`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }

    async postScrapSong(url) {
        console.log(url);
        const response = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({url: url})
        });
        return await response.json();
    }

    async getLecturaVa(fecha) {
        console.log(`Obteniendo lectura para la fecha: ${fecha}`);
        const response = await fetch(`${this.URI}/lectura-va?fecha=${fecha}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });
        return await response.json();
    }

    async getSantos(fecha) {
        console.log(`Obteniendo santos para la fecha: ${fecha}`);
        const response = await fetch(`${this.URI}/santos?fecha=${fecha}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });
        return await response.json();
    }

    async getFiestas(fecha) {
        console.log(`Obteniendo fiestas del mes`);
        const response = await fetch(`${this.URI}/fiestas?fecha=${fecha}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });
        return await response.json();
    }

}

export default ScrapingService;
