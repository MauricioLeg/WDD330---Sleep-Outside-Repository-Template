import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

console.log("Current page HTML body when script runs:", document.body.innerHTML);

const category = getParam('category');
const title = document.querySelector('.title highlight');
const dataSource = new ProductData();
const element = document.querySelector('.product-list');

const productList = new ProductList(category, dataSource, element, title);

window.addEventListener('DOMContentLoaded', () => {
    productList.init();
})