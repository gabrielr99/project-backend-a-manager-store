// const camelize = require('camelize');
const connection = require('../db/connection');

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
  return sale;
};

module.exports = {
  findAll,
  findById,
};