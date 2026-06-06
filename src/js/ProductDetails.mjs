import { getLocalStorage, 
    setLocalStorage,
    updateCartCount
} from './utils.mjs';

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
        const cartItems = getLocalStorage('so-cart') || [];

        const productToSave = this.product;

        cartItems.push(productToSave);
        setLocalStorage('so-cart', cartItems);

        updateCartCount();
        
        alert(`${this.product.NameWithoutBrand} added to cart`, false);
    }
    
    renderProductDetails() {
        this.details.innerHTML = productDetailsTemplate(this.product);
        document.getElementById('addToCart').addEventListener('click', () => {
            this.addProductToCart();
        });
    }
}

function productDetailsTemplate(product) {
    // 1. SAFELY FALLBACK IF IMAGES OBJECT OR PRIMARYLARGE IS MISSING
    const image = product.Images && product.Images.PrimaryLarge 
        ? product.Images.PrimaryLarge 
        : (product.Image || '../images/placeholder.png');

    // 2. SAFELY FALLBACK IF COLORS ARRAY IS MISSING OR EMPTY
    const color = product.Colors && product.Colors.length > 0 
        ? product.Colors[0].ColorName 
        : 'Default Color';

    const suggestedPrice = product.SuggestedRetailPrice;
    const finalPrice = product.FinalPrice;

    let discountHtml = '';
    let priceHtml = `<p class="product-card__price">$${finalPrice ? finalPrice.toFixed(2) : '0.00'}</p>`;

    // Check if the item is discounted
    if (suggestedPrice && finalPrice && suggestedPrice > finalPrice) {
        const percent = ((suggestedPrice - finalPrice) / suggestedPrice) * 100;
        const discount = Math.round(percent);

        discountHtml = `<span class="product_discount details_discount">-${discount}% OFF</span>`;
        priceHtml = `
        <p class="product-card__price">
            <span class="sale-price">$${finalPrice.toFixed(2)}</span>
            <span class="original-price">$${suggestedPrice.toFixed(2)}</span>
        </p>
        `;
    }

    return `<h3>${product.Brand ? product.Brand.Name : ''}</h3>
            <h2 class="divider">${product.NameWithoutBrand || product.Name}</h2>
            <div class="image-container" style="position: relative; display: inline-block; width: 100%;">
                <img
                    class="divider"
                    src="${image}"
                    alt="${product.NameWithoutBrand || product.Name}"
                />
                ${discountHtml}
            </div>
            ${priceHtml}
            <p class="product__color">${color}</p>
            <p class="product__description">${product.DescriptionHtmlSimple || ''}</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>`;
}