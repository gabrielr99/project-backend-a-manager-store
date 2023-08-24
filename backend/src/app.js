const express = require('express');
const { productsController, salesController } = require('./controllers');
const validateInsertProduct = require('./middlewares/validateInsertProduct');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// INICIANDO

// PRODUCTS
app.get('/products/search', productsController.findByName);
app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);
app.post('/products', validateInsertProduct, productsController.insert);
app.put('/products/:id', validateInsertProduct, productsController.update);
app.delete('/products/:id', productsController.deleted);

// SALES
app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);
app.post('/sales', salesController.insert);
app.delete('/sales/:id', salesController.deleted);
app.put('/sales/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = app;
