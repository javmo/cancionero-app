class CategoryService {
    constructor() {
     //   this.URI = 'http://localhost:3000/api/category';
        this.URI = `${process.env.REACT_APP_API_URL}/category`;
    }

    async getCategories() {
        // fetch por defecto hace GET
        const response = await fetch(this.URI);
        const categories = await response.json()
        return categories;
    }

    async getCategory(categoryId) {
        const response = await fetch(`${this.URI}/${categoryId}`, {

        });
        const category = await response.json();
        return category;
    }

    async postCategory(category) {
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: category
        });
        return await reponse.json();
    }

    async deleteCategory(categoryId) {
        const response = await fetch(`${this.URI}/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
    }

    async updateCategory(cateogry) {
        const response = await fetch(`${this.URI}/${cateogry._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(cateogry)
        });
        return await response.json();
    }

/*    async postLyricPublish(lyricPub) {
        console.log(song, 'ANTES LOG');
        const reponse = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: lyricPub
        });
        return await reponse.json();
        console.log(data, 'DESPUES LOG');
    }

    async deleteLyricPublish(lyricPubId) {
        const response = await fetch(`${this.URI}/${lyricPubId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }*/

}
export default CategoryService;