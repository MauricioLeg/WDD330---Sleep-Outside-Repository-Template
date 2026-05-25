import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  // Changed parameter naming to accommodate both category browsing and user keyword searches
  constructor(query, dataSource, listElement) {
    this.query = query;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 1. Fetch data items array passing the flexible query string down to the API
    const list = await this.dataSource.getData(this.query);
    
    // 2. Render out results
    this.renderList(list);
  }

  renderList(list) {
    // Clear out any old contents inside the target list container element first
    this.listElement.innerHTML = "";

    // 3. If the search query has no matches, give the user helpful text feedback
    if (!list || list.length === 0) {
      this.listElement.innerHTML = `<li class="no-results">No products found matching "${this.query}". Try searching for something else!</li>`;
      return;
    }

    // 4. Otherwise, map and render the matching cards array matching list items
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}