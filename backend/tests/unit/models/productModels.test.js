const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const productsModel = require('../../../src/models/products.model');

const dbProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

describe('testes ProductsModel', function () {
  it('testando função findAll', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(connection, 'execute').resolves([dbProducts]);
    // Agir
    const result = await productsModel.findAll();
    // Acertar(averiguar)
    expect(result).to.be.a('array');
    expect(result).to.be.deep.equal(dbProducts);
    expect(Object.keys(result[0])).to.be.deep.equal(['id', 'name']);
    expect(Object.values(result[1])).to.be.deep.equal([2, 'Traje de encolhimento']);
  });

  it('testando função findById', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(connection, 'execute').resolves([dbProducts]);
    // Agir
    const productId = 1;
    const result = await productsModel.findById(productId);
    console.log(result);
    expect(result).to.be.a('object');
    expect(result).to.be.deep.equal(dbProducts[0]);
    expect(Object.keys(result)).to.be.deep.equal(['id', 'name']);
    expect(Object.values(result)).to.be.deep.equal([1, 'Martelo de Thor']);
  });

  afterEach(function () {
    sinon.restore();
  });
});