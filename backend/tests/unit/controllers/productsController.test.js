const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const dbProducts = require('../../mochs/dbProducts');

const { expect } = chai;
chai.use(sinonChai);

describe('testando productController', function () {
  it('testando findAll', async function () {
    sinon.stub(productsService, 'findAll').resolves({
        status: 'SUCCESSFUL',
        data: dbProducts,
      });

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(dbProducts);
  });

  it('testando funcao findById', async function () {
    sinon.stub(productsService, 'findById').resolves({
      status: 'SUCCESSFUL', data: dbProducts[0],
    });

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(dbProducts[0]);
  });

  it('testando funcão insert', async function () {
    const lenght = dbProducts.length;
    const newProduct = {
      id: lenght + 1,
      name: 'ProdutoX',
    };

    sinon.stub(productsService, 'insert')
      .resolves({ status: 'CREATED', data: newProduct });

    const req = {
      body: { name: 'ProdutoX' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insert(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(newProduct);
  });

  beforeEach(function () {
    sinon.restore();
  });
});