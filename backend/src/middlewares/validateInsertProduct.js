const validateInsertProduct = (req, res, next) => {
  const newProduct = req.body;
  if (!newProduct.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (newProduct.name.length <= 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

module.exports = validateInsertProduct;