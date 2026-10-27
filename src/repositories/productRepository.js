const seed = require('../data/seedData');

const seededAt = new Date().toISOString();
const products = new Map(
  seed.products.map((product) => [
    product.id,
    { ...product, createdAt: seededAt, updatedAt: seededAt },
  ])
);
let nextId = Math.max(0, ...products.keys()) + 1;

exports.findAll = () => Array.from(products.values());

exports.findById = (id) => products.get(id);

exports.findByName = (name) => {
  const normalizedName = name.toLowerCase();
  return Array.from(products.values()).find(
    (product) => product.name.toLowerCase() === normalizedName
  );
};

exports.findByCategoryId = (categoryId) =>
  Array.from(products.values()).filter(
    (product) => product.categoryId === categoryId
  );

exports.create = (data) => {
  const now = new Date().toISOString();
  const product = {
    ...data,
    id: nextId,
    createdAt: now,
    updatedAt: now,
  };
  products.set(nextId, product);
  nextId += 1;
  return product;
};

exports.update = (id, changes) => {
  const product = products.get(id);
  if (!product) return undefined;

  const updatedProduct = {
    ...product,
    ...changes,
    id,
    createdAt: product.createdAt,
    updatedAt: new Date().toISOString(),
  };
  products.set(id, updatedProduct);
  return updatedProduct;
};

exports.remove = (id) => products.delete(id);
