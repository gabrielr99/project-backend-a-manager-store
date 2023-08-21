const chai = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const { productsService } = require('../../../src/services/index');
const dbProducts = require('../../mochs/dbProducts');

const { expect } = chai;

describe('testes prodctsService', function () {
  it('testando função findAll', async function () {
    sinon.stub(productsModel, 'findAll').resolves([dbProducts]);
    const result = await productsService.findAll();
    expect(result).to.be.a('object');
    expect(result.status).to.be.equal('SUCCESSFUL');
  });

  it('testando função findAll com products inexistente', async function () {
    sinon.stub(productsModel, 'findAll').resolves(null);
    const result = await productsService.findAll();
    expect(result).to.be.a('object');
    expect(result.status).to.be.equal('NOT_FOUND'); 
  });

  it('testando função findById', async function () {
    sinon.stub(productsModel, 'findById').resolves(dbProducts[0]);
    const productId = 1;
    const result = await productsService.findById(productId);
    const { status, data } = result;
    expect(data).to.be.an('object');
    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(dbProducts[0]);
  });

  it('testando função findById id inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(null);
    const productId = 25;
    const result = await productsService.findById(productId);
    const { status, data } = result;
    // Acertar(averiguar)
    expect(status).to.be.equal('NOT_FOUND');
    expect(data).to.be.an('object');
    expect(data.message).to.be.an('string');
    expect(data.message).to.be.equal('Product not found');
  });

  it('testando função insert', async function () {
    const lenght = dbProducts.length;
    sinon.stub(productsModel, 'insert').resolves(lenght + 1);
    const newProduct = {
      name: 'ProdutoX',
    };
    const id = await productsModel.insert(newProduct);
    sinon.stub(productsModel, 'findById').resolves({ id, ...newProduct });
    const result = await productsService.insert(newProduct);
    expect(result).to.be.an('object');
    expect(result.status).to.be.equal('CREATED');
    expect(result.data).to.be.deep.equal({ id, name: newProduct.name });
  });

  it('testando função update', async function () {
    const productId = 1;
    const dataToUpdate = {
      name: 'ProdutoX',
    };
    sinon.stub(productsModel, 'findById').resolves(dbProducts[0]);
    sinon.stub(productsModel, 'update').resolves({ id: productId, ...dataToUpdate });
    const result = await productsService.update(productId, dataToUpdate);
    expect(result).to.be.an('object');
    expect(result.status).to.be.equal('SUCCESSFUL');
    expect(result.data).to.be.deep.equal({ id: productId, ...dataToUpdate });
  });

  it('testando função update com id inexistente', async function () {
    const productId = 1;
    const dataToUpdate = {
      name: 'ProdutoX',
    };
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.update(productId, dataToUpdate);
    expect(result).to.be.an('object');
    expect(result.status).to.be.equal('NOT_FOUND');
  });

  afterEach(function () {
    sinon.restore();
  });
});
