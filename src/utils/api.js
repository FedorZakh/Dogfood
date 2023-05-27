const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }
  getProductList(page = 1, limit = 15) {
    return fetch(`${this.baseUrl}/products?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: this.headers,
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  searchProducts(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      headers: this.headers,
    }).then((e) =>
      onResponse(e).catch((reject) => {
        console.log(onResponse(reject));
      })
    );
  }
  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "PUT",
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "DELETE",
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  changeProductLike(productId, isLiked) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: isLiked ? "DELETE" : "PUT",
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  getProductById(id) {
    return fetch(`${this.baseUrl}/products/${id}`, {
      headers: this.headers,
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }

  addProductReview(productId, data) {
    return fetch(`${this.baseUrl}/products/review/${productId}`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  deleteProductReview(productId, reviewId) {
    return fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      headers: this.headers,
      method: "DELETE",
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }

  signin(data) {
    return fetch(`${this.baseUrl}/signin`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }

  signup(data) {
    return fetch(`${this.baseUrl}/signup`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  resetPass(data) {
    return fetch(`${this.baseUrl}/forgot-password`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
  resetPassWithToken(token, data) {
    return fetch(`${this.baseUrl}/password-reset/${token}`, {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then(onResponse)
      .catch((reject) => {
        console.log(onResponse(reject));
      });
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhMDEzNWUwYmYyYzUxOWI5ZDI2MWIiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjgzNjIwNDQ0LCJleHAiOjE3MTUxNTY0NDR9.KshnSKRY3dXt66pc65yEz7JOhiXnzgkSh-2adkh8Joo",
  },
};

export const api = new Api(config);

export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    method: "GET",
    headers: config.headers,
  })
    .then(onResponse)
    .catch((reject) => {
      console.log(onResponse(reject));
    });
};
