const { salesModel } = require('../models');
const { validateInsertSales } = require('../utils/validateInsertSales');
const { validateUpdateQuantityInSale,
  validateQuantity } = require('../utils/validateUpdateQuantityInSale');

const findAll = async () => {
  const sales = await salesModel.findAll();
  if (!sales) {
    return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (!sale || !sale[0]) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (sales) => {
  const error = await validateInsertSales(sales);
  if (error) {
    const { data } = error;
    return { status: error.status, data: { message: data.message } };
  }
  const id = await salesModel.insert(sales);
  const insertSales = {
    id,
    itemsSold: sales,
  };
  return { status: 'CREATED', data: insertSales };
};

const deleted = async (productId) => {
  const findProduct = await salesModel.findById(productId);
  if (!findProduct[0]) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  await salesModel.deleted(productId);
  return { status: 'DELETE' };
};

const updateQuantity = async (saleId, productIdToUpdate, dataQauntity) => {
  const error = await validateUpdateQuantityInSale(saleId, productIdToUpdate)
    || validateQuantity(dataQauntity);
  if (error) {
    const { data } = error;
    return { status: error.status, data: { message: data.message } };
  }
  await salesModel.updateQuantity(saleId, productIdToUpdate, dataQauntity);
  const findSale = await salesModel.findById(saleId);
  const saleToUpdateQuantity = findSale
    .find(({ productId }) => productId === productIdToUpdate);
  return { status: 'SUCCESSFUL', data: { ...saleToUpdateQuantity, saleId } };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleted,
  updateQuantity,
};