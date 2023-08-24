const date = '2023-07-29T13:23:03.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const foundSales = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
  {
    date,
    productId: 3,
    quantity: 15,
  },
];

const insertSale = [
  {
    productId: 3,
    quantity: 10,
  },
];

const saleToupdateQuantity = [
  { date, productId: 1, quantity: 5 },
  { date, productId: 2, quantity: 10 },
];

const updateQuantity = {
  date,
  productId: 2,
  quantity: 5,
  saleId: 1,
};

module.exports = {
    salesFromDB,
    foundSales,
    insertSale,
    saleToupdateQuantity,
    updateQuantity,
};