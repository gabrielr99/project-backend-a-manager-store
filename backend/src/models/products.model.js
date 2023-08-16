const camelize = require('camelize');
const connection = require('../db/connection');
const { getFormattedColumnNames,
  getFormattedPlaceholders, 
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return camelize(product);
};

const insert = async (dataProduct) => {
  const columns = getFormattedColumnNames(dataProduct);
  const placeholders = getFormattedPlaceholders(dataProduct);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;
  const [{ insertId }] = await connection.execute(query, [...Object.values(dataProduct)]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};