const express = require('express');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Express 5 leaves req.body undefined when the client sends no body.
app.use((req, res, next) => {
  if (req.body == null) req.body = {};
  next();
});

app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Product Inventory API is running',
    endpoints: ['/api/categories', '/api/products'],
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
