const { salesModel } = require('../models');

const validateQuantity = (dataQuantity) => {
  if (dataQuantity.quantity < 1) {
    return {
      status: 'INVALID_VALUE',
      data: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (!dataQuantity.quantity) {
    return { status: 'BAD_REQUEST', data: { message: '"quantity" is required' } };
  }
};

const validateUpdateQuantityInSale = async (saleId, productToUpdate) => {
  const findSale = await salesModel.findById(saleId);
  if (!findSale || !findSale[0]) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  const findProductInSale = findSale
  .find(({ productId }) => productId === productToUpdate);
  if (!findProductInSale) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
};

module.exports = {
  validateUpdateQuantityInSale,
  validateQuantity,
};