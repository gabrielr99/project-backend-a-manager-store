const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, foundSales } = require('../../mochs/dbSales');

describe('testes salesModel', function () {
  it('testando função findAll', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    // Agir
    const sales = await salesModel.findAll();
    // Acertar(averiguar)
    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromDB);
  });

  it('testando função findById', async function () {
    // AAA
    // Arramjar(preparar)
    sinon.stub(connection, 'execute').resolves([foundSales[2]]);
    // Agir
    const sale = await salesModel.findById(2);
    // Acertar(averiguar)
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(foundSales[2]);
  });

  afterEach(function () {
    sinon.restore();
  });
});