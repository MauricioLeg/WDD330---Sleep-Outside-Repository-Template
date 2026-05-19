import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-i');
      removeFromCart(productId);
    });
  });
}

function cartItemTemplate(item, index) {
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
  <button class="remove-from-cart" data-id="${index}">🗑</button>
  </li>`;
return newItem;
}

function removeFromCart(index) {
  let cart = getLocalStorage('so-cart') || [];
  cart.splice(index, 1);
  setLocalStorage('so-cart', cart);
  renderCartContents();
}

renderCartContents();