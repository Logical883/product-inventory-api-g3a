// ============================================================
// Database connection + table creation (owner: Logical883)
// ------------------------------------------------------------
// We use SQLite through "better-sqlite3". The whole database is
// ONE file on disk, so nobody needs to install a database server.
// Everyone else: just `require` this file to talk to the database.
//
//   const db = require('../config/db');
//   const rows = db.prepare('SELECT * FROM products').all();
// ============================================================
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Where the database file lives (can be changed in .env)
const dbPath = path.resolve(process.env.DB_PATH || './data/inventory.db');

// Make sure the folder exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// IMPORTANT: SQLite ignores foreign keys unless we switch them on.
db.pragma('foreign_keys = ON');

// ------------------------------------------------------------
// Tables
// ------------------------------------------------------------
db.exec(`
  -- One category has MANY products
  CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  -- Each product belongs to exactly ONE category (the foreign key)
  CREATE TABLE IF NOT EXISTS products (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    name                 TEXT    NOT NULL UNIQUE,
    description          TEXT,
    price                REAL    NOT NULL CHECK (price >= 0),
    quantity             INTEGER NOT NULL DEFAULT 0  CHECK (quantity >= 0),
    low_stock_threshold  INTEGER NOT NULL DEFAULT 10 CHECK (low_stock_threshold >= 0),
    category_id          INTEGER NOT NULL,
    created_at           TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at           TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
  );
`);

module.exports = db;
