const { productsModel } = require('../models/index');

const findAll = async () => {
    const products = await productsModel.findAll();
    if (!products) {
      return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
    }
    return { status: 'SUCCESSFUL', data: products };
};
  
const findById = async (productId) => {
    const product = await productsModel.findById(productId);
    if (!product) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    return { status: 'SUCCESSFUL', data: product };
};

const insert = async (dataProduct) => {
  const productId = await productsModel.insert(dataProduct);
  const newProduct = await productsModel.findById(productId);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};