const { productsModel } = require('../models');

const confirmProducInDb = async (sales) => {
  const toHaveProductIdInDb = sales
    .map(({ productId }) => productsModel.findById(productId));
  const result = await Promise.all(toHaveProductIdInDb);
  return result.every((id) => id !== undefined);
};

const validateInsertSales = async (sales) => {
  const toHaveProductId = sales.every((product) => product.productId);
  if (!toHaveProductId) {
    return { status: 'BAD_REQUEST', data: { message: '"productId" is required' } };
  }
  const quantityLenght = sales.every(({ quantity }) => quantity > 0);
  const toHaveQuantity = sales.every(({ quantity }) => quantity === 0 || quantity);
  if (!toHaveQuantity) {
    return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
  }
  if (!quantityLenght) {
    return {
      status: 'INVALID_VALUE', data: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  const notContain = await confirmProducInDb(sales);
  if (!notContain) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
};

module.exports = {
  validateInsertSales,
};