const express = require('express');
const { productsController, salesController } = require('./controllers');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// INICIANDO

app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);

app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);

module.exports = app;
