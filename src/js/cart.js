import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  // 1. Add the fallback || [] so cartItems is never null
  const cartItems = getLocalStorage('so-cart') || [];
  
  // 2. This map function is now safe and won't crash if the cart is empty
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  // 3. Cleanly handle the UI if the cart is empty
  if (cartItems.length === 0) {
      document.querySelector('.product-list').innerHTML = '<p>Your cart is currently empty.</p>';
  } else {
      document.querySelector('.product-list').innerHTML = htmlItems.join('');
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
