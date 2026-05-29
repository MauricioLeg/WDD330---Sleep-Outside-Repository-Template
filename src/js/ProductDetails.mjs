import { getLocalStorage, setLocalStorage } from './utils.mjs';

export function addProductToCart(product) {
  const items = getLocalStorage('so-cart') || [];
  items.push(product);
  setLocalStorage('so-cart', items);
}

export default class ProductDetails {
    constructor(productId, dataSource, details) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.details = details;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(`${this.productId}`); // or ${baseURL}product/${id}?
        console.log(this.product);
        this.renderProductDetails();
    }
    
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }
    
    renderProductDetails() {
        this.details.innerHTML = productDetailsTemplate(this.product);
        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }
}

function productDetailsTemplate(product) {
    const image = product.Images.PrimaryLarge;
    const color = product.Colors[0].ColorName;

    return `<h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${image}"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">${product.FinalPrice}</p>
        <p class="product__color">${color}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>`;
}