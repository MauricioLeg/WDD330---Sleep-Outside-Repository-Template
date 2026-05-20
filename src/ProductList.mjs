//using template literals

// ProductList.mjs

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
        </a>
    </li>`;
}
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
        const filteredList = list.filter(product => 
        product.Id === '880RR' || 
        product.Id === '985RF' || 
        product.Id === '985PR' || 
        product.Id === '344YJ'
    );
        this.renderList(filteredList);
    }
    renderList(list) {       
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
}