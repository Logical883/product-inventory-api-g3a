// ============================================================
// Starts the server (owner: Logical883)
// Run with:  npm run dev   (auto-restarts)  or  npm start
// ============================================================
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Product Inventory API running at http://localhost:${PORT}`);
});
