const seed = require('../data/seedData');

const seededAt = new Date().toISOString();
const categories = new Map(
  seed.categories.map((category) => [
    category.id,
    { ...category, createdAt: seededAt },
  ])
);
let nextId = Math.max(0, ...categories.keys()) + 1;

exports.findAll = () => Array.from(categories.values());

exports.findById = (id) => categories.get(id);

exports.findByName = (name) => {
  const normalizedName = name.toLowerCase();
  return Array.from(categories.values()).find(
    (category) => category.name.toLowerCase() === normalizedName
  );
};

exports.create = (data) => {
  const category = {
    id: nextId,
    name: data.name,
    createdAt: new Date().toISOString(),
  };
  categories.set(nextId, category);
  nextId += 1;
  return category;
};

exports.update = (id, changes) => {
  const category = categories.get(id);
  if (!category) return undefined;

  const updatedCategory = {
    ...category,
    ...changes,
    id,
    createdAt: category.createdAt,
  };
  categories.set(id, updatedCategory);
  return updatedCategory;
};

exports.remove = (id) => categories.delete(id);
