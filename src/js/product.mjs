import getParam from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { addProductToCart } from './ProductDetails.mjs';
import { getLocalStorage } from './utils.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await this.dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document.getElementById('addToCart').addEventListener('click', addToCartHandler);