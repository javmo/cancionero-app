class ChordsService {
    constructor() {
       // this.URI = 'http://localhost:3000/api/chords'; // La URL de la API de los acordes
       this.URI = `${process.env.REACT_APP_API_URL}/chords`; // URL de la API basada en una variable de entorno
    }

    async getAllChords() {
        try {
            const response = await fetch(this.URI); // Obtener todos los acordes
            const chords = await response.json(); // Convertir la respuesta a JSON
            return chords; // Devolver los acordes
        } catch (error) {
            console.error('Error fetching chords:', error);
            throw error; // Propagar el error para que el componente que utiliza este servicio lo maneje
        }
    }

    async getChordBySongId(songId) {
        
        try {
            console.log("antes get"+songId)
            const response = await fetch(`${this.URI}/bySongId/${songId}`); // Obtener el acorde por ID de canción
            const chord = await response.json(); // Convertir la respuesta a JSON
            console.log("despues get"+chord)
            return chord; // Devolver el acorde
        } catch (error) {
            console.error('Error fetching chord by song ID:', error);
            throw error; // Propagar el error para que el componente que utiliza este servicio lo maneje
        }
    }

    async searchChordsByTitle(title) {
        try {
            const response = await fetch(`${this.URI}/search?title=${title}`); // Buscar acordes por título
            const chords = await response.json(); // Convertir la respuesta a JSON
            return chords; // Devolver los acordes encontrados
        } catch (error) {
            console.error('Error searching chords by title:', error);
            throw error; // Propagar el error para que el componente que utiliza este servicio lo maneje
        }
    }
}

export default ChordsService;
