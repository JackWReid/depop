import urlencode from 'urlencode';

export function getFeaturedItems(count, callback) {
  const getPagination = () => {
    return `first: ${count}`;
  }

  const rawQuery = `{
  viewer {
    suggested {
      products(${getPagination()}) {
        edges {
          node {
            publicId
            description
            counters {
              numLikes
            }
            slug
            seller {
              username
            }
            pictures {
              url
              width
              height
              formats {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
}`;

  fetch(`https://graphql.depop.com/?query=${urlencode(rawQuery)}`)
  .then(response => response.json())
  .then(json => callback(json.data.viewer.suggested.products.edges))
  .catch(error => console.error(error));
}

export function getSearchItems(query, callback) {
  const getParams = () => {
    return `query: "${query}", first: 60`
  };

  const rawQuery = `{
    viewer {
      productSearch(${getParams()}) {
        edges {
          node {
            publicId
            description
            counters {
              numLikes
            }
            slug
            seller {
              username
            }
            pictures {
              url
              width
              height
              formats {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }`;

  fetch(`https://graphql.depop.com/?query=${urlencode(rawQuery)}`)
  .then(response => response.json())
  .then(json => callback(json.data.viewer.productSearch.edges))
  .catch(error => console.error(error));
}

export function getBrandGuess(productId, callback) {
  fetch(`https://product.depop.com/api/v1/product/${productId}/brand/`)
  .then(response => response.text())
  .then(text => callback(text))
  .catch(error => console.error(error));
};

export function getPopGuess(product, callback) {
  const queryBody = {
    "inputs": [
      {
        "data": {
          "image": {
            "url": product.pictures[0].url
          }
        }
      }
    ]
  };

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    "Authorization": "Bearer mllXGAyzxdI6c76vfK61dTaws7Vd8e",
  });

  fetch(`https://api.clarifai.com/v2/models/b9c6209fec4a45f08d46c08851038ff4/outputs`, {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    body: JSON.stringify(queryBody),
  })
  .then(response => response.json())
  .then(json => callback(json))
  .catch(error => console.error(error));
}
