const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => {
      throw { name:'servicesError', message: err };
    })
  }
}

export default class ExternalServices {
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

    const response = await fetch(`${baseURL}checkout`, options);
    const result = await convertToJson(response);
    return result;
  }
}
