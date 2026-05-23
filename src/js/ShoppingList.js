import { loadHeaderFooter } from "./utils.mjs";

export default class ShoppingList {
    constructor(category, dataSource) {
        this.category = category;
        this.dataSource = dataSource;
    }

    async init() {
        const products = await this.dataSource.getData()
        this.renderTemplate(products);
    }

    loadHeaderFooter;
}