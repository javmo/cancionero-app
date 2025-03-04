class CancionService {
    constructor() {
        this.URI = `${process.env.REACT_APP_API_URL}/cancion`;
    }

    async getCanciones(fecha) {
        const response = await fetch(`${this.URI}?fecha=${fecha}`);
        return await response.json();
    }

    async postCancion(cancion) {
        const response = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cancion)
        });
        return await response.json();
    }

    async deleteCancion(cancionId) {
        const response = await fetch(`${this.URI}/${cancionId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
}

export default CancionService;
