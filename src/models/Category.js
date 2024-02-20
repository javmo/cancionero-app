class Category {
    constructor(categoryType, order) {
        this.categoryType = categoryType
        this.order = order
    }

    toJson() {
        const dataJson = JSON.stringify({
            categoryType: this.categoryType,
            order: this.order
        })
        return dataJson;
    }
}

export default Category;