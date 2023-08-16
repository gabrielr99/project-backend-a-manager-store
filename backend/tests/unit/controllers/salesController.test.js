const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromDB, foundSales } = require('../../mochs/dbSales');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da SALES CONTROLLER', function () {
  it('Lista todas as vendas com sucesso - Status 200', async function () {
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

  it('Lista uma única venda com sucesso - Status 200', async function () {
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

  it('Verifica se retorna o status correto do erro "Sale not found" - Status 404', async function () {
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

  it('Verifica se uma nova "sale" foi criada com sucesso - Status 201', async function () {
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

  afterEach(function () {
    sinon.restore();
  });
});