const AppError = require('../utils/AppError');

const fail = (errors) => new AppError('Validation failed', 400, errors);

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const isWholeNumber = (value, min) => Number.isInteger(value) && value >= min;

exports.validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!isWholeNumber(id, 1)) {
    return next(fail(['id must be a positive whole number']));
  }
  next();
};

exports.validateCategory = (req, res, next) => {
  const errors = [];
  const { name } = req.body;

  if (!isNonEmptyString(name)) {
    errors.push('name is required');
  } else if (name.trim().length > 50) {
    errors.push('name must be 50 characters or fewer');
  }

  if (errors.length) return next(fail(errors));

  req.body.name = name.trim();
  next();
};

exports.validateProduct = (req, res, next) => {
  const errors = [];
  const { name, description, price, quantity, lowStockThreshold, categoryId } = req.body;

  if (!isNonEmptyString(name)) {
    errors.push('name is required');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be text');
  }

  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    errors.push('price must be a number that is 0 or more');
  }

  if (quantity !== undefined && !isWholeNumber(quantity, 0)) {
    errors.push('quantity must be a whole number that is 0 or more');
  }

  if (lowStockThreshold !== undefined && !isWholeNumber(lowStockThreshold, 0)) {
    errors.push('lowStockThreshold must be a whole number that is 0 or more');
  }

  if (categoryId === undefined) {
    errors.push('categoryId is required');
  } else if (!isWholeNumber(categoryId, 1)) {
    errors.push('categoryId must be a positive whole number');
  }

  if (errors.length) return next(fail(errors));

  req.body.name = name.trim();
  if (typeof description === 'string') req.body.description = description.trim();
  next();
};

exports.validateStockChange = (req, res, next) => {
  const { change } = req.body;
  if (!Number.isInteger(change) || change === 0) {
    return next(fail(['change must be a whole number other than 0']));
  }
  next();
};
