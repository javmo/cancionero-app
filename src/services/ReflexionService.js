class ReflexionService {
    constructor() {
        this.URI = `${process.env.REACT_APP_API_URL}/reflexion`;
    }

    async getReflexiones(fecha) {
        const response = await fetch(`${this.URI}?fecha=${fecha}`);
        return await response.json();
    }

    async postReflexion(reflexion) {
        const response = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(reflexion)
        });
        return await response.json();
    }

    async likeReflexion(reflexionId) {
        const response = await fetch(`${this.URI}/${reflexionId}/like`, {
            method: 'POST'
        });
        return await response.json();
    }

    async inspirarReflexion(reflexionId) {
        const response = await fetch(`${this.URI}/${reflexionId}/inspirar`, {
            method: 'POST'
        });
        return await response.json();
    }

    async deleteReflexion(reflexionId) {
        const response = await fetch(`${this.URI}/${reflexionId}`, {
            method: 'DELETE'
        });
        return await response.json();
    }

    async getReflexionById(id) {
        const response = await fetch(`${this.URI}/${id}`);
        return await response.json();
    }
    
}

export default ReflexionService;