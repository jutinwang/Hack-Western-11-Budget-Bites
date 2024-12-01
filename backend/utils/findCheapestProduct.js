function findCheapestProduct(products) {
  if (!products.length) {
    return null;
  }

  return products.reduce((cheapest, product) => {
    const normalizedPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    const cheapestPrice = parseFloat(cheapest.price.replace(/[^0-9.]/g, ''));

    return normalizedPrice < cheapestPrice ? product : cheapest;
  });
}


module.exports = findCheapestProduct;
