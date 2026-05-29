import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter(); 

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  const items = document.querySelector('.product-list')
  const cartFooter = document.querySelector(".cart-footer");
  const totalValueSpan = document.querySelector("#cart-total-value");

  if (cartItems.length === 0) {
    items.textContent = 'The cart is empty';
    if (cartFooter) {
      cartFooter.classList.add("hide");
    }
  } else {
    items.innerHTML = htmlItems.join('');
    
    if (cartFooter && totalValueSpan) {
      cartFooter.classList.remove("hide");

      let total = 0;
      cartItems.forEach((item) => {
        total += item.FinalPrice; 
      });  
      
      totalValueSpan.textContent = `$${total.toFixed(2)}`;
    }
  }
  
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      removeFromCart(productId);
    });  
  });  
}  

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
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