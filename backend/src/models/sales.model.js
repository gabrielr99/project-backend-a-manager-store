const camelize = require('camelize');
const connection = require('../db/connection');
const { getFormattedColumnNames,
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const query = `
  SELECT 
  id AS saleId, 
    sales.date,
    product_id AS productId,
    quantity
  FROM sales
  LEFT JOIN sales_products
  ON sales_products.sale_id = id
  ORDER BY saleId, productId;
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const findById = async (saleId) => {
  const query = `
  SELECT 
    sales.date,
    product_id AS productId,
    quantity
  FROM sales
  LEFT JOIN sales_products
  ON sales_products.sale_id = id
  WHERE id = ?;
  `;
  const [sale] = await connection.execute(query, [saleId]);
  return camelize(sale);
};

const insert = async (sales) => {
  const query1 = 'INSERT INTO sales () VALUES ()';
  const [{ insertId }] = await connection.execute(query1, []);
  const promises = sales
    .map((product) => {
      const columns = getFormattedColumnNames(product);
      const placeholders = getFormattedPlaceholders(product);
      const query2 = `INSERT INTO sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`;
      return connection.execute(query2, [...Object.values(product), insertId]);
    });
  await Promise.all(promises);

  return insertId;
};

const deleted = async (saleId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  return connection.execute(query, [saleId]);
};

const updateQuantity = async (saleId, productId, dataQuantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  return connection.execute(query, [...Object.values(dataQuantity), saleId, productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  deleted,
  updateQuantity,
};