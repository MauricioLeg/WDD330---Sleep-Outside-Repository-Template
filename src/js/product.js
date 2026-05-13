import { getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler());

export const dataSource = new ProductData('tents');
export const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();