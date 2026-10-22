// ============================================================
// EXPRESS APP SETUP (owner: Logical883)
// Connects the middleware and routes. The server itself is started
// in server.js.
//
// The journey of a request:
//   Route -> Validation -> Controller -> Service -> Repository -> Map
// ============================================================
const express = require('express');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Lets the API read JSON sent in the request body
app.use(express.json());

// Express 5 leaves req.body undefined when nothing is sent.
// This makes sure it is always an object, so `req.body.name` never crashes.
app.use((req, res, next) => {
  if (req.body === undefined) req.body = {};
  next();
});

// Logs every request in the terminal
app.use(requestLogger);

// Health check: open http://localhost:3000/ to see the API is alive
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Product Inventory API is running',
    endpoints: ['/api/categories', '/api/products'],
  });
});

// Main routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Must stay LAST: unknown routes (404) and error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
