const { salesService } = require('../services/index');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesService.insert(sales);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleted = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleted(id);
  if (data) {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  findAll,
  findById,
  insert,
  deleted,
};