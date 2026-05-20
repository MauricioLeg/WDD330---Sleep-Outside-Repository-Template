// ProductList.mjs

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // Store these parameters as properties on the class instance
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // from the data source
        const list = await this.dataSource.getData();
        
        // Render the list 
        console.log('Data received inside ProductList class:', list);
    }
}