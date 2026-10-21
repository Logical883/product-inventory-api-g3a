// ============================================================
// Sample data (owner: Logical883)
// Run with:  npm run seed
// Safe to run many times. Existing items are skipped.
// ============================================================
require('dotenv').config();
const db = require('../config/db');

const categories = ['Drinks', 'Snacks', 'Stationery'];

const products = [
  // name, description, price, quantity, low_stock_threshold, category
  ['Bottled Water', '500ml bottle', 5.0, 50, 10, 'Drinks'],
  ['Orange Juice', '1 litre carton', 18.5, 8, 10, 'Drinks'],      // low stock on purpose
  ['Biscuits', 'Pack of 12', 6.0, 3, 5, 'Snacks'],                // low stock on purpose
  ['Chocolate Bar', '50g bar', 4.5, 40, 10, 'Snacks'],
  ['Notebook', 'A5, 80 pages', 12.0, 25, 5, 'Stationery'],
  ['Ballpoint Pen', 'Blue ink', 2.0, 100, 20, 'Stationery'],
];

const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
const findCategory = db.prepare('SELECT id FROM categories WHERE name = ?');
const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products
    (name, description, price, quantity, low_stock_threshold, category_id)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const seed = db.transaction(() => {
  categories.forEach((name) => insertCategory.run(name));
  products.forEach(([name, description, price, quantity, threshold, categoryName]) => {
    const { id } = findCategory.get(categoryName);
    insertProduct.run(name, description, price, quantity, threshold, id);
  });
});

seed();
console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
