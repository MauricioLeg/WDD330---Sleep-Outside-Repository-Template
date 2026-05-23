import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">${product.FinalPrice}</p>
            </a>
          </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement, title) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.title = title;
    }

    async init() {
        const products = await this.dataSource.getData(this.category)
        this.renderList(products);
    }

    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products);
        const cleanTitle = this.category.replace('-', '');
        this.title.innerHTML = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    };
}