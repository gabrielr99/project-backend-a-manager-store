const chai = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const { productsService } = require('../../../src/services/index');
const dbProducts = require('../../mochs/dbProducts');

const { expect } = chai;

describe('testes prodctsService', function () {
  it('testando findAll', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(productsModel, 'findAll').resolves([dbProducts]);
    // Agir
    const result = await productsService.findAll();
    // Acertar(averiguar)
    expect(result).to.be.a('object');
  });

  it('testando função findById', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(productsModel, 'findById').resolves(dbProducts[0]);
    // Agir
    const productId = 1;
    const result = await productsService.findById(productId);
    const { status, data } = result;
    // Acertar(averiguar)
    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(dbProducts[0]);
  });

  it('testando função findById id inválido', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(productsModel, 'findById').resolves(null);
    // Agir
    const productId = 25;
    const result = await productsService.findById(productId);
    const { status, data } = result;
    // Acertar(averiguar)
    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.be.an('string');
    expect(data.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
