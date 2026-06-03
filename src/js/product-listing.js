import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const searchTerm = getParam('search');
const title = document.querySelector('.title');
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');

if (element) {
  const productList = new ProductList(category, searchTerm, dataSource, element, title);
  productList.init();
}