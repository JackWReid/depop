import urlencode from 'urlencode';

function transformFromService(response) {
  return response.map(node => ({
    node: {
      publicId: node.id,
      description: node.description,
      seller: {
        username: node.user_id,
      },
      slug: node.slug,
      picture: node.pictures_data[0].formats.P1.url,
    }
  }));
}

function transformFromGraphQL(response) {
  const data = response.data.viewer.suggested.products.edges;
  return data.map(item => ({
    node: {
      counters: item.node.counters,
      description: item.node.description,
      publicId: item.node.publicId,
      seller: item.node.seller,
      slug: item.node.slug,
      picture: item.node.pictures[0].formats[0].url,
    }
  }));
}

export function getUserIdFor(username, callback) {
  const rawQuery = `{
    viewer {
      user(username: "${username}") {
        publicId
      }
    }
  }`;

  fetch(`https://graphql.depop.com/?query=${urlencode(rawQuery)}`)
  .then(response => response.json())
  .then(json => json.data.viewer.user.publicId)
  .then(json => callback(json))
  .catch(error => console.error(error));
}

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
  .then(json => transformFromGraphQL(json))
  .then(json => callback(json))
  .catch(error => console.error(error));
}

export function getExperimentPrices(count = 24, callback) {
  fetch(`
https://product.depop.com/api/v1/products/experiment/prices/popular/?offset_id=&limit=${count}`)
  .then(response => response.json())
  .then(json => transformFromService(json.objects))
  .then(json => callback(json))
  .catch(error => console.error(error));
}

export function getExperimentGender(count = 24, gender = 'm', callback) {
  fetch(`
https://product.depop.com/api/v1/products/experiment/gender/popular/?offset_id=&limit=${count}&gender=${gender}`)
  .then(response => response.json())
  .then(json => transformFromService(json.objects))
  .then(json => callback(json))
  .catch(error => console.error(error));
}

export function getExperimentLikes(count = 24, userId = '6', callback) {
  fetch(`https://product.depop.com/api/v1/products/experiment/likes/popular/?offset_id=&limit=${count}&user_id=${userId}`)
  .then(response => response.json())
  .then(json => transformFromService(json.objects))
  .then(json => callback(json))
  .catch(error => console.error(error));
}
