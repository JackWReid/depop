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
    return `query: "${query}", first: 15`
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
