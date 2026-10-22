// ============================================================
// CATEGORY REPOSITORY (owner: Akata692, branch: feature/repositories)
// ------------------------------------------------------------
// The repository is the ONLY place that touches the stored data.
// Our "database" is a JavaScript Map in memory:
//     key = category id,  value = the category object
//
// RULES FOR THIS LAYER
//  - Only store, find, change and delete data. NO business rules here
//    (no "is the name a duplicate?" decisions, that belongs to the service).
//  - Never use req / res (that's the controller's job).
//  - Return plain objects. Return `undefined` / `false` when nothing is found,
//    and let the SERVICE decide to throw a 404.
//
// YOUR TASKS
//  1. Create the Map and a counter for the next id.
//  2. Load the starting data from ../data/seedData (categories).
//     Set the counter to (highest seed id + 1).
//  3. Replace every placeholder below. The function names and what they
//     return MUST stay exactly as written, because the services already
//     rely on them.
//
//  Category object shape:  { id, name, createdAt }
// ============================================================
const AppError = require('../utils/AppError');
// const seed = require('../data/seedData');

// const categories = new Map();
// let nextId = 1;

const notImplemented = () => {
  throw new AppError('Not implemented yet', 501);
};

// Returns an ARRAY of all categories
exports.findAll = () => notImplemented();

// Returns the category with this id, or undefined
exports.findById = (id) => notImplemented();

// Returns the category with this name (ignore upper/lower case), or undefined
exports.findByName = (name) => notImplemented();

// Creates a category: gives it an id + createdAt, stores it, returns it
// data example: { name: 'Toys' }
exports.create = (data) => notImplemented();

// Updates the stored category and returns the updated one, or undefined if the id doesn't exist
// changes example: { name: 'Beverages' }
exports.update = (id, changes) => notImplemented();

// Deletes the category. Returns true if it existed, false if not
exports.remove = (id) => notImplemented();
