const API_URL = "http://localhost:8080";

class HTTPError extends Error {
  constructor(status, error) {
    super(status);
    this.error = error;
  }
}

const apiRequest = async (method, path, body = null) => {
  let options = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: null
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  let uri = API_URL + path;
  let response = await fetch(uri, options);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new HTTPError(response.status, response.error);
  }
};

export default apiRequest;
