const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, foundSales } = require('../../mochs/dbSales');

describe('testes salesModel', function () {
  it('testando função findAll', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromDB);
  });

  it('testando função findById', async function () {
    sinon.stub(connection, 'execute').resolves([foundSales[2]]);
    const sale = await salesModel.findById(2);
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(foundSales[2]);
  });

  it('testando função findById com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const sale = await salesModel.findById(2);
    expect(sale).to.be.deep.equal(undefined);
  });

  it('testando função deleted', async function () {
    sinon.stub(connection, 'execute').resolves([foundSales[2]]);
    const sale = await salesModel.deleted(2);
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal([foundSales[2]]);
  });

  it('testando função deleted com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const sale = await salesModel.deleted(2);
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal([]);
  });

  it('testando função updateQuantity', async function () {
    sinon.stub(connection, 'execute').resolves([foundSales[2]]);
    const sale = await salesModel.updateQuantity(2, 3, { quantity: 10 });
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal([foundSales[2]]);
  });

  afterEach(function () {
    sinon.restore();
  });
});