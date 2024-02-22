class ScrapingService {
    constructor() {
        //   this.URI =  'http://localhost:3000/api/scraping';
        this.URI =  `${process.env.REACT_APP_API_URL}/openia`;
    }

    async getRecomendations() {
        const response = await fetch(`${this.URI}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
        return await response.json();
    }
    

}

export default ScrapingService;
