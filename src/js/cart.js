import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // 1. Get items, fallback to an empty array [] if the cart is empty
  const cartItems = getLocalStorage("so-cart") || [];
  
  // 2. Render the items in the cart
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // 3. SELECT THE TOTAL HTML ELEMENTS
  const cartFooter = document.querySelector(".cart-footer");
  const totalValueSpan = document.querySelector("#cart-total-value");

  // 4. CHECK IF THE CART HAS ITEMS
  if (cartItems.length > 0) {
    // Show the footer by removing the 'hide' class
    cartFooter.classList.remove("hide");

    // Calculate the total cost of all items
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice; 
    });

    // Display the total formatted to 2 decimal places
    totalValueSpan.textContent = `$${total.toFixed(2)}`;
  } else {
    // If the cart is empty, make sure the footer stays hidden
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();