// ============================================================
// PRODUCT REPOSITORY (owner: Akata692, branch: feature/repositories)
// ------------------------------------------------------------
// The ONLY place that touches the stored products.
// Data is kept in a Map:  key = product id,  value = the product object
//
// RULES FOR THIS LAYER
//  - Only store, find, change and delete data. NO business rules here
//    (no stock checks, no duplicate decisions, no "does the category exist?").
//  - Never use req / res.
//  - Return plain objects. Return `undefined` / `false` when nothing is found,
//    and let the SERVICE decide to throw a 404.
//
// YOUR TASKS
//  1. Create the Map and a counter for the next id.
//  2. Load the starting data from ../data/seedData (products).
//     Set the counter to (highest seed id + 1).
//  3. Replace every placeholder below. Keep the function names and
//     return values EXACTLY as written (the services rely on them).
//
//  Product object shape:
//  { id, name, description, price, quantity, lowStockThreshold,
//    categoryId, createdAt, updatedAt }
// ============================================================
const seed = require('../data/seedData');

const seededAt = new Date().toISOString();
const products = new Map(
  seed.products.map((product) => [
    product.id,
    { ...product, createdAt: seededAt, updatedAt: seededAt },
  ])
);
let nextId = Math.max(0, ...products.keys()) + 1;

// Returns an ARRAY of all products
exports.findAll = () => Array.from(products.values());

// Returns the product with this id, or undefined
exports.findById = (id) => products.get(id);

// Returns the product with this name (ignore upper/lower case), or undefined
exports.findByName = (name) => {
  const normalizedName = name.toLowerCase();
  return Array.from(products.values()).find(
    (product) => product.name.toLowerCase() === normalizedName
  );
};

// Returns an ARRAY of all products that belong to this category id (can be empty)
exports.findByCategoryId = (categoryId) =>
  Array.from(products.values()).filter(
    (product) => product.categoryId === categoryId
  );

// Creates a product: gives it an id + createdAt + updatedAt, stores it, returns it
// data example: { name, description, price, quantity, lowStockThreshold, categoryId }
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

// Merges `changes` into the stored product, refreshes updatedAt,
// returns the updated product, or undefined if the id doesn't exist
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

// Deletes the product. Returns true if it existed, false if not
exports.remove = (id) => products.delete(id);
