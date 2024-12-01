const stores = {
  nofrills: {
    baseUrl: 'https://www.nofrills.ca/search?search-bar=',
    selectors: {
      price: '.css-pwnbcb',
      name: '.css-6qrhwc',
    }
  },
  walmart: {
    baseUrl: 'https://www.walmart.ca/en/search?q=',
    selectors: {
      price: '.price-content',
      name: '.w_q67L',
    }
  }
};
module.exports = stores;