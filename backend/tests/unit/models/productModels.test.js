const { expect } = require('chai');
const sinon = require('sinon');

const dbProducts = require('../../mochs/dbProducts');

const connection = require('../../../src/db/connection');
const productsModel = require('../../../src/models/products.model');

describe('testes ProductsModel', function () {
  it('testando função findAll', async function () {
    sinon.stub(connection, 'execute').resolves([dbProducts]);
    const result = await productsModel.findAll();
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal(dbProducts);
    expect(Object.keys(result[0])).to.be.deep.equal(['id', 'name']);
    expect(Object.values(result[1])).to.be.deep.equal([2, 'Traje de encolhimento']);
  });

  it('testando função findById', async function () {
    sinon.stub(connection, 'execute').resolves([dbProducts]);
    const productId = 1;
    const result = await productsModel.findById(productId);
    expect(result).to.be.a('object');
    expect(result).to.be.deep.equal(dbProducts[0]);
    expect(Object.keys(result)).to.be.deep.equal(['id', 'name']);
    expect(Object.values(result)).to.be.deep.equal([1, 'Martelo de Thor']);
  });

  it('testando função insert', async function () {
    const lenght = dbProducts.length;
    sinon.stub(connection, 'execute').resolves([{ insertId: lenght + 1 }]);
    const newProduct = {
      name: 'ProdutoX',
    };
    const newProductId = lenght + 1;
    const result = await productsModel.insert(newProduct);
    expect(result).to.be.a('number');
    expect(result).to.be.deep.equal(newProductId);
  });

  it('testando função deleted', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const productId = 1;
    const result = await productsModel.deleted(productId);
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal([{ affectedRows: 1 }]);
  });

  afterEach(function () {
    sinon.restore();
  });
});