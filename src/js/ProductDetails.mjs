import { getLocalStorage, setLocalStorage } from './utils.mjs';

export function addProductToCart(product) {
    const items = getLocalStorage('so-cart') || [];
    items.push(product);
    setLocalStorage('so-cart', items);
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails('main');
        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }
    
    renderProductDetails(containerId) {
        productDetailsTemplate(this.product, containerId);
    }
}

function productDetailsTemplate(product, containerId) {
    const container = document.getElementById(containerId);
    container.querySelector('h2').textContent = product.Brand.Name;
    container.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}

