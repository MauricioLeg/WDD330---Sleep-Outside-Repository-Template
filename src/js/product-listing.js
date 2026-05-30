import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const title = document.querySelector('.title');
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');

const productList = new ProductList(category, dataSource, element, title);

productList.init();