const categories = [
  { id: 1, name: 'Drinks' },
  { id: 2, name: 'Snacks' },
  { id: 3, name: 'Stationery' },
];

// Orange Juice and Biscuits start at or below their low-stock thresholds.
const products = [
  { id: 1, name: 'Bottled Water', description: '500ml bottle', price: 5.0, quantity: 50, lowStockThreshold: 10, categoryId: 1 },
  { id: 2, name: 'Orange Juice', description: '1 litre carton', price: 18.5, quantity: 8, lowStockThreshold: 10, categoryId: 1 },
  { id: 3, name: 'Biscuits', description: 'Pack of 12', price: 6.0, quantity: 3, lowStockThreshold: 5, categoryId: 2 },
  { id: 4, name: 'Chocolate Bar', description: '50g bar', price: 4.5, quantity: 40, lowStockThreshold: 10, categoryId: 2 },
  { id: 5, name: 'Notebook', description: 'A5, 80 pages', price: 12.0, quantity: 25, lowStockThreshold: 5, categoryId: 3 },
  { id: 6, name: 'Ballpoint Pen', description: 'Blue ink', price: 2.0, quantity: 100, lowStockThreshold: 20, categoryId: 3 },
];

module.exports = { categories, products };
