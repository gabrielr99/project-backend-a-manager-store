const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const { salesFromDB, foundSales, updateQuantity, saleToupdateQuantity } = require('../../mochs/dbSales');
const { salesService } = require('../../../src/services');

const { expect } = chai;

describe('testes salesService:', function () {
  it('testando função findAll', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromDB);
    const result = await salesService.findAll();
    expect(result).to.be.a('object');
    expect(result.status).to.be.equal('SUCCESSFUL');
  });
  
  it('testando função findAll com sales inexistente', async function () {
    sinon.stub(salesModel, 'findAll').resolves(null);
    const result = await salesService.findAll();
    expect(result.status).to.be.equal('NOT_FOUND');
  });

  it('testando função findById', async function () {
    sinon.stub(salesModel, 'findById').resolves([foundSales[2]]);
    const result = await salesService.findById(2);
    expect(result).to.be.a('object');
    expect(result.status).to.be.equal('SUCCESSFUL');
    expect(result.data).to.be.length(1);
    expect(result.data[0].quantity).to.be.equal(15);
  });

  it('testando função findById com id inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves(null);
    const result = await salesService.findById(3);
    expect(result.status).to.be.equal('NOT_FOUND');
  });

  // it('testando função insert', async function () {
  //   console.log('ENTROU');
  //   sinon.stub(salesModel, 'insert').resolves(salesFromDB.length + 1);
  //   console.log(salesFromDB.length + 1);
  //   const result = await salesService.insert([{
  //     productId: 3,
  //     quantity: 10,
  //   }]);
  //   console.log(result);
  //   expect(result.status).to.be.equal('CREATED');
  // });

  it('testando função insert sem quantity', async function () {
    const result = await salesService.insert([{ productId: 3 }]);
    expect(result.status).to.be.equal('BAD_REQUEST');
    expect(result.data.message).to.be.equal('"quantity" is required');
  });

  it('testando função insert sem productId', async function () {
    const result = await salesService.insert([{ quantity: 3 }]);
    expect(result.status).to.be.equal('BAD_REQUEST');
    expect(result.data.message).to.be.equal('"productId" is required');
  });

  it('testando função insert com quantity 0', async function () {
    const result = await salesService.insert([{ productId: 2, quantity: 0 }]);
    expect(result.status).to.be.equal('INVALID_VALUE');
    expect(result.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('testando função updateQuantity', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleToupdateQuantity);
    sinon.stub(salesModel, 'updateQuantity').resolves(updateQuantity);
    const result = await salesService.updateQuantity(1, 2, { quantity: 5 });
    expect(result.status).to.be.equal('SUCCESSFUL');
    expect(result.data).to.be.a('object');
    expect(result.data.quantity).to.be.equal(10);
  });

  it('testando função udpateQuantity com saleId inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves(null);
    const result = await salesService.updateQuantity(3, 2, { quantity: 5 });
    expect(result.status).to.be.equal('NOT_FOUND');
    expect(result.data.message).to.be.equal('Sale not found');
  });

  it('testando função udpateQuantity com productId inválido', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleToupdateQuantity);
    const result = await salesService.updateQuantity(1, 3, { quantity: 5 });
    expect(result.status).to.be.equal('NOT_FOUND');
    expect(result.data.message).to.be.equal('Product not found in sale');
  });

  it('testando função udpateQuantity com quantity 0', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleToupdateQuantity);
    const result = await salesService.updateQuantity(1, 2, { quantity: 0 });
    expect(result.status).to.be.equal('INVALID_VALUE');
    expect(result.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('testando função udpateQuantity sem quantity', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleToupdateQuantity);
    const result = await salesService.updateQuantity(1, 2, {});
    expect(result.status).to.be.equal('BAD_REQUEST');
    expect(result.data.message).to.be.equal('"quantity" is required');
  });

  afterEach(function () {
    sinon.restore();
  });
});