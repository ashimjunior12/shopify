export const GET_PRODUCTS = `query{
	products(first:10) {
	  edges {
	    node {
	      id
        title
        descriptionHtml
        handle
        images(first:1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first:3) {
          edges {
            node {
              id
              price{
                amount
                currencyCode
              }
            }
          }
        }
	    }
	  }
	}
}`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation createCart($variantId: ID!, $quantity: Int!) {
    cartCreate(input: {
      lines: [{ merchandiseId: $variantId, quantity: $quantity }]
    }) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  product {
                    title
                  }
                  price {
                    amount
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_TO_CART = `
mutation addToCart($cartId: ID!, $variantId: ID!, $quantity: Int!){
  cartLinesAdd(cartId: $cartId, lines: [{merchandiseId: $variantId, quantity:$quantity}]){
    cart{
      id
      checkoutUrl
      lines(first:2){
        edges{
          node{
            id
            quantity
            merchandise{
              ...on ProductVariant{
                id
                product{
                  title
                }
                price{
                  amount
                  currencyCode
                }
                image{
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                price {
                  amount
                }
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART = `mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
                price {
                  amount
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
}
`;