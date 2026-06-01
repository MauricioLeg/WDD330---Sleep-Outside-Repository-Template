import { getParam, getLocalStorage, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
// import { addProductToCart } from './ProductDetails.mjs';

loadHeaderFooter();
const category = getParam('category');

const dataSource = new ExternalServices(category);
const productId = getParam('product');
const details = document.querySelector('.product-detail');
const product = new ProductDetails(productId, dataSource, details);
product.init();

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
