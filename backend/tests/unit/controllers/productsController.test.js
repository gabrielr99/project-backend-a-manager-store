const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const dbProducts = require('../../mochs/dbProducts');

const { expect } = chai;
chai.use(sinonChai);

describe('Restes da productController', function () {
  it('testando função findAll', async function () {
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

  it('testando função findAll com erro', async function () {
    sinon.stub(productsService, 'findAll').resolves({ status: 'NOT_FOUND', data: { message: 'Products not found' } });

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findAll(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Products not found' });
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

  it('testando funcao findById com erro', async function () {
    sinon.stub(productsService, 'findById').resolves({
      status: 'NOT_FOUND', data: { message: 'Product not found' },
    });

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
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

  it('testando funçao update', async function () {
    const dataToUpdate = {
      name: 'ProdutoX',
    };

    sinon.stub(productsService, 'update')
      .resolves({ status: 'SUCCESSFUL', data: { id: 1, ...dataToUpdate } });

    const req = {
      params: { id: 1 },
      body: dataToUpdate,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.update(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ id: 1, ...dataToUpdate });
  });

  it('testando função deleted com erro', async function () {
    sinon.stub(productsService, 'deleted').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    const req = { params: { id: 2000 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.deleted(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  beforeEach(function () {
    sinon.restore();
  });
});