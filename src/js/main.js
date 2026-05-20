import ProductData from './ProductData.mjs';
import ProductList from '/ProductList.mjs';


const dataSource = new ProductData('tents');

//Grab the element from index.html where the list belongs
const listElement = document.querySelector('.product-list');

//Create the instance and pass it the category, data source, and element
const productList = new ProductList('tents', dataSource, listElement);
//initialize the product list to fetch the data and render it
productList.init();