export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(template, parentElement, list, position = 'afterbegin', clear = false) {
  const string = list.map(template);
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, string.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const resp = await fetch(path);
  const template = await resp.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const headerElement = document.getElementById('main-header');
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate('/partials/footer.html');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(footerTemplate, footerElement);

  initSearchForm();
  updateCartCount();
}

export function alertMessage(message, scroll=true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.addEventListener('click', function(e) {
    if (e.target.tagName === 'SPAN' || e.target.classList.contains('close-alert')) {
      main.removeChild(this);
    }
  })
  const main = document.querySelector('main');
  main.prepend(alert)

  if (scroll) window.scrollTo(0, 0);
}
export function removeAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}

export function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const totalCount = cartItems.length;
  const backpack = document.querySelector('.cart');
  if (backpack) {
    let badge = document.querySelector('.superscript');

    if (badge) {
      if (totalCount > 0) {
        badge.textContent = totalCount;
        badge.style.display = 'flex';
      } else {
        badge.textContent = '';
        badge.style.display = 'none';
      }
    }
  }
}

export function initSearchForm() {
  const searchForm = document.querySelector('#site-search');
  if (!searchForm) return;

  const searchInput = searchForm.querySelector('input[name="search"]');
  if (!searchInput) return;

  const currentSearch = new URLSearchParams(window.location.search).get('search');
  if (currentSearch) {
    searchInput.value = currentSearch;
  }

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      alertMessage('Please enter a product name to search for.');
      return;
    }

    window.location.href = `/product_listing/index.html?search=${encodeURIComponent(searchTerm)}`;
  });
}