const { productsService } = require('../services/index');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const findByName = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productsService.findByName(q);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const dataProduct = req.body;
  const { status, data } = await productsService.insert(dataProduct);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const dataProduct = req.body;
  const { status, data } = await productsService.update(id, dataProduct);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleted = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleted(id);
  if (data) {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
    deleted,
    findByName,
};