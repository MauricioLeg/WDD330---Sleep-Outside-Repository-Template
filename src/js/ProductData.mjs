const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // No longer needs a hardcoded local file path tracker
  }

  // UPDATED: Added an optional 'isSearch' parameter flag
  async getData(query, isSearch = false) {
    // Whether it's a category like 'tents' or a text query like 'marmot', 
    // we send it straight to the search endpoint wrapper
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}