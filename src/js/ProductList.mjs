import { renderListWithTemplate, updateCartCount } from "./utils.mjs";

export function productCardTemplate(product) {
  const suggestedPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;
  let discountHtml = "";

  if (suggestedPrice && suggestedPrice > finalPrice) {
    const percent = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
    const discount = Math.round(percent);
    discountHtml = `<p class="product_discount card_discount">-${discount}%</p>`;
  }

  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
      ${discountHtml}
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, searchTerm, dataSource, listElement, title) {
    this.category = category;
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.title = title;
  }

  async init() {
    if (!this.listElement) return;

    let products = [];

    if (this.searchTerm) {
      products = await this.dataSource.searchProducts(this.searchTerm);
      this.renderTitle(`Search results for "${this.searchTerm}"`);
    } else if (this.category) {
      products = await this.dataSource.getData(this.category);
      const cleanTitle = this.category.replace(/-/g, " ");
      this.renderTitle(cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1));
    } else {
      this.listElement.innerHTML = '<li class="product-card product-card--empty">Use the search box or a category to find products.</li>';
      updateCartCount();
      return;
    }

    this.renderList(products);
    updateCartCount();
  }

  renderTitle(value) {
    if (this.title) {
      this.title.textContent = value;
    }
  }

  renderList(products) {
    if (!Array.isArray(products) || products.length === 0) {
      this.listElement.innerHTML = '<li class="product-card product-card--empty">No products found.</li>';
      return;
    }

    renderListWithTemplate(productCardTemplate, this.listElement, products, "beforeend", true);
  }
}