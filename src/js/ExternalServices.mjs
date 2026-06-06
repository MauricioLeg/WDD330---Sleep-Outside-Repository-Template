const baseURL = import.meta.env.VITE_SERVER_URL || 'https://wdd330-backend.onrender.com/';

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
    const response = await fetch(`${baseURL}products/search/${encodeURIComponent(query)}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  //constructor(category) {
  //}
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

    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}
