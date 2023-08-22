const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromDB, foundSales } = require('../../mochs/dbSales');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da salesController', function () {
  it('testando função findAll', async function () {
    sinon.stub(salesService, 'findAll')
      .resolves({ status: 'SUCCESSFUL', data: salesFromDB });

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(salesFromDB);
  });

  it('testando função findById', async function () {
    sinon.stub(salesService, 'findById')
      .resolves({ status: 'SUCCESSFUL', data: foundSales[0] });

    const req = {
      params: { id: 2 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(foundSales[0]);
  });

  it('testando função findById com id inexistente', async function () {
    sinon.stub(salesService, 'findById')
      .resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: { id: 14543643 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Sale not found' });
  });

  it('testando função insert', async function () {
    const newSale = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };

    sinon.stub(salesService, 'insert')
      .resolves({ status: 'CREATED', data: newSale });

    const req = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insert(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(newSale);
  });

  it('testando função deleted', async function () {
    sinon.stub(salesService, 'deleted')
      .resolves({ status: 'SUCCESSFUL', data: foundSales[0] });

    const req = {
      params: { id: 2 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleted(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(foundSales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});