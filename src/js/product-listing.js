import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// 1. Dynamically grab the category from the URL string
const category = getParam('category');

// 2. Initialize ProductData without hardcoded paths
const dataSource = new ProductData();

const element = document.querySelector('.product-list');

// 3. Pass the dynamic category variable into the ProductList instance
const productList = new ProductList(category, dataSource, element);

productList.init();