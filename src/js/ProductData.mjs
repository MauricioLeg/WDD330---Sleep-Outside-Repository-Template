const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {
    // Keep this empty as you did! Perfect.
  }

  // 1. Add 'category' as a parameter and switch to async/await
  async getData(category) {
    // 2. Change the URL path to point to the live API search endpoint
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    // 3. Return data.Result because the API wraps the product array inside a "Result" property
    return data.Result; 
  }

  async findProductById(id) {
    // We will refactor this to query the API directly in Step 6!
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
