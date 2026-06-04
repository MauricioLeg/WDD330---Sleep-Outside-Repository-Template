const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  // 1. Convert response body to JSON first
  const jsonResponse = await res.json();

  // 2. Check if the response status is 'ok'
  if (res.ok) {
    return jsonResponse;
  } else {
    // 3. If not ok, throw a custom object with name and the server's JSON message
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  async searchProducts(query) {
    const categories = ['tents', 'backpacks', 'sleeping-bags'];
    const allProducts = [];

    for (const category of categories) {
      const products = await this.getData(category);
      allProducts.push(...products);
    }

    const cleanQuery = query.trim().toLowerCase();

    return allProducts.filter(product => {
      const name = product.Name?.toLowerCase() || '';
      const shortName = product.NameWithoutBrand?.toLowerCase() || '';
      const brand = product.Brand?.Name?.toLowerCase() || '';
      const description = product.DescriptionHtmlSimple?.toLowerCase() || '';

      return (
        name.includes(cleanQuery) ||
        shortName.includes(cleanQuery) ||
        brand.includes(cleanQuery) ||
        description.includes(cleanQuery)
      );
    });
  }
  constructor(category) {
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const resp = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(resp);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
