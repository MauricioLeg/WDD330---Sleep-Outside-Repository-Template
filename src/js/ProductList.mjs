import { renderListWithTemplate } from './utils.mjs';

export function productCardTemplate(product, category) {
    return `<li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}&category=${category}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }


    async init() {
        const products = await this.dataSource.getData(this.category); //week03 updated to pass the category to getData
        this.renderList(products);
    }

renderList(products) {
    renderListWithTemplate(
        // 1. We hand-deliver both the product and category to your template
        (product) => productCardTemplate(product, this.category), 
        this.listElement, 
        products, 
        'afterbegin', 
        true
    );
}
}

