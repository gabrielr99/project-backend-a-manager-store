const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const validateInsertProduct = require('../../../src/middlewares/validateInsertProduct');

describe('Testes middleware validateInsertProduct', function () {
    it('Será validado que o middleware é um função', function () {
        expect(typeof validateInsertProduct).to.be.equal('function');
    });

    it('Será validado se o next será chamado contendo a chave name e mais de 5 caracteres', function () {
        const next = sinon.stub().returns();
        const req = {
            body: {
                name: 'Product X',
            },
        };
        
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };

        validateInsertProduct(req, res, next);
        
        expect(next).to.have.been.calledWith();
    });

    it('Será validado que não é possível cadastrar um produto sem o nome', function () {
        const next = sinon.stub().returns();
        const req = {
            body: {
                name: '',
            },
        };
        
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };

        validateInsertProduct(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
    
    it('Será validado que não é possível cadastrar um produto com o nome menor que 5 caracteres', function () {
        const next = sinon.stub().returns();
        const req = {
            body: {
                name: 'oi',
            },
        };
        
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };

        validateInsertProduct(req, res, next);
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
});