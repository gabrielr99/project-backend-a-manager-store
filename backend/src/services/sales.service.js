const { salesModel } = require('../models');

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

module.exports = {
  findAll,
  findById,
};