import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // 1. Get the current cart from storage.
  // If it doesn't exist yet, default to an empty array.
  let cart = getLocalStorage("so-cart") || [];

  // 2. Since getLocalStorage should return an array (if fixed),
  // ensure it is actually an array before pushing.
  if (!Array.isArray(cart)) {
    cart = [cart]; // Fallback in case old data was a single object
  }

  // 3. Add the new product to the list
  cart.push(product);

  // 4. Save the updated list back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
