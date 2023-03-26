const getAllBrandsFromProducts = (products) => {
  return products.reduce((brands, currentProduct) => {
    if (!brands.includes(currentProduct.brandName)) {
      return [...brands, currentProduct.brandName];
    }

    return brands;
  }, []);
};

const sortByName = (a, b) => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
};

const priceOfCart = (cart) => {
  return cart.reduce(
    (sum, { product, quantity }) => {
      sum[0] += product.actualPrice * quantity;
      sum[1] += product.offeredPrice * quantity;
      return sum;
    },
    [0, 0]
  );
};

const pluralize = (count, query) => {
  return count > 1 ? `${count} ${query}s` : `${count} ${query}`;
};

export { getAllBrandsFromProducts, sortByName, priceOfCart, pluralize };
