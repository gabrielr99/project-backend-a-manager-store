const { salesModel } = require('../models');

const { validateInsertSales } = require('../utils/validateInsertSales');

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

module.exports = {
  findAll,
  findById,
  insert,
};