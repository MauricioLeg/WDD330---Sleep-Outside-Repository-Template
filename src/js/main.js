// import ProductData from './ProductData.mjs';
// import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

// Adjust the path to where your alerts.json file lives relative to the built site
const alertSystem = new Alert('json/alerts.json'); 
alertSystem.init();

loadHeaderFooter();

// const dataSource = new ProductData('tents');
// const element = document.querySelector('.product-list');
// const productList = new ProductList('Tents', dataSource, element);

// productList.init();