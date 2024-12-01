function findTopCheapestProducts(products, topN = 5) {
  const validProducts = products
    .filter(product => product.price && product.price.includes('$'))
    .map(product => {
      return {
        ...product,
        numericPrice: parseFloat(product.price.replace(/[^0-9.]/g, '')),
      };
    })
    .filter(product => !isNaN(product.numericPrice)); // Ensure valid numeric price

  validProducts.sort((a, b) => a.numericPrice - b.numericPrice);

  return validProducts.slice(0, topN).map(({ numericPrice, ...rest }) => rest);
}

