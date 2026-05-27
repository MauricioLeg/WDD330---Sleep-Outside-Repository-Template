import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Activate header and footer templates
loadHeaderFooter();

// Initialize the data source without hardcoded categories
const dataSource = new ProductData();

// Dynamically pull the specific product ID from the URL string
const productId = getParam('product');

// Instantiate and initialize the product details view
const product = new ProductDetails(productId, dataSource);
product.init();