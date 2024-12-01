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
      price: '.mr1.mr2-xl.b.black.lh-copy.f5.f4-l',
      name: '.normal.dark-gray.mb0.mt1.lh-title.f6.f5-l.lh-copy',
    }
  }
};
module.exports = stores;