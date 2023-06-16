const onResponse = (res) => {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
};

class Api {
  constructor(data, freshHeaders) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
    this.freshHeaders = freshHeaders;
  }
  getProductList(page = 1, limit = 20) {
    return fetch(`${this.baseUrl}/products?page=${page}&limit=${limit}`, {
      method: "GET",
      ...this.freshHeaders(),
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      ...this.freshHeaders(),
    }).then(onResponse);
  }
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      ...this.freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      ...this.freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  searchProducts(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      ...this.freshHeaders(),
    }).then((e) => onResponse(e));
  }
  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method: "PUT",
    }).then(onResponse);
  }
  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method: "DELETE",
    }).then(onResponse);
  }
  changeProductLike(productId, isLiked) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      ...this.freshHeaders(),
      method: isLiked ? "DELETE" : "PUT",
    }).then(onResponse);
  }
  getProductById(id) {
    return fetch(`${this.baseUrl}/products/${id}`, {
      ...this.freshHeaders(),
    }).then(onResponse);
  }

  addProductReview(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  deleteProductReview(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this.freshHeaders(),
      method: "DELETE",
    }).then(onResponse);
  }

  signin(data) {
    return fetch(`${this.baseUrl}/signin`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  signup(data) {
    return fetch(`${this.baseUrl}/signup`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  resetPass(data) {
    return fetch(`${this.baseUrl}/forgot-password`, {
      ...this.freshHeaders(),
      method: "POST",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
  resetPassWithToken(token, data) {
    return fetch(`${this.baseUrl}/password-reset/${token}`, {
      headers: { ...this.freshHeaders() },
      method: "PATCH",
      body: JSON.stringify(data),
    }).then(onResponse);
  }
}
const freshHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhMDEzNWUwYmYyYzUxOWI5ZDI2MWIiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgzNjIwNDQ0LCJleHAiOjE3MTUxNTY0NDR9.KshnSKRY3dXt66pc65yEz7JOhiXnzgkSh-2adkh8Joo",
  },
};

export const api = new Api(config, freshHeaders);

export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    method: "GET",
    headers: config.headers,
  }).then(onResponse);
};
