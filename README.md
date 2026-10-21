# 📦 Product Inventory API

A backend project that helps a shop keep track of **what it sells**, **how much of it is left**, and **when it's time to restock**.

Built with **Express.js** and **SQLite** as a group project for the Backend Development course on [betechified.com](https://betechified.com).

---

## 1. What is this project? (The simple version)

Imagine a shop owner named **Ama** who sells drinks, snacks and stationery.

Right now she writes everything in a notebook:

- "Bottled water: 50 left"
- "Notebook: 12 left"
- "Biscuits: 3 left... I should order more!"

Notebooks get lost, pages get messy, and she can't quickly answer questions like *"What's running low?"*

**This project is a digital version of Ama's notebook.** It is a program running on a computer (a *server*) that other apps, like a phone app or a website, can talk to in order to:

- Add a new product
- See all products
- Change a product's details (like its price)
- Remove a product
- Record that items were sold or restocked
- Warn when something is running out

---

## 2. Quick explanations of the big words

| Word | What it means in plain English |
|---|---|
| **API** | A "waiter" between an app and the data. The app places an order ("give me all products"), the API goes to the kitchen (the database) and brings back the result. |
| **Endpoint** | One specific thing the waiter can do. Each has its own address, like `/api/products`. |
| **CRUD** | The four basic things you can do with any data: **C**reate, **R**ead, **U**pdate, **D**elete. |
| **Database** | The storeroom where all the information is saved permanently, even when the server is turned off. |
| **Table** | One section of the database, like one page of the notebook. We have two: `categories` and `products`. |
| **Foreign key** | A link between two tables. Each product points to its category, like writing "Drinks" next to "Bottled Water". |
| **Validation** | Checking that what someone sends us makes sense before we save it (for example, a price can't be negative). |
| **Status code** | A number in the reply that tells you how it went. `201` = created, `400` = you sent something wrong, `404` = not found. |
| **JSON** | The format the data is written in, so computers can read it easily. It looks like `{ "name": "Bottled Water" }`. |

---

## 3. What the system does

### Categories
Groups that products belong to, such as *Drinks*, *Snacks*, *Stationery*.

### Products
The actual items in the shop. Each product has:

| Field | Example | Meaning |
|---|---|---|
| `id` | `1` | Unique number given automatically |
| `name` | `"Bottled Water"` | What it's called |
| `description` | `"500ml bottle"` | Extra details (optional) |
| `price` | `5.00` | Cost of one item |
| `quantity` | `50` | How many are in stock right now |
| `low_stock_threshold` | `10` | The warning level: at or below this, it's "low stock" |
| `category_id` | `1` | Which category it belongs to (the foreign key) |

### Stock rules (the "smart" part)

1. **Quantity can never be negative.** You can't have -5 bottles of water.
2. **You can't sell more than you have.** If there are 3 left and someone tries to remove 10, the API says no.
3. **Low stock warning.** When `quantity` is at or below the `low_stock_threshold`, the product is flagged as low stock.
4. **A category with products can't be deleted.** Otherwise those products would be left without a category.

---

## 4. Examples, step by step

These show what you send and what you get back.

### Example 1: Create a category

**You send:** `POST /api/categories`
```json
{ "name": "Drinks" }
```

**You get back:** status `201 Created`
```json
{
  "success": true,
  "data": { "id": 1, "name": "Drinks" }
}
```

### Example 2: Add a product

**You send:** `POST /api/products`
```json
{
  "name": "Bottled Water",
  "description": "500ml bottle",
  "price": 5.0,
  "quantity": 50,
  "low_stock_threshold": 10,
  "category_id": 1
}
```

**You get back:** status `201 Created`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Bottled Water",
    "price": 5.0,
    "quantity": 50,
    "category_id": 1
  }
}
```

### Example 3: Someone buys 3 bottles (reduce stock)

**You send:** `PATCH /api/products/1/stock`
```json
{ "change": -3 }
```

**You get back:** status `200 OK`
```json
{
  "success": true,
  "data": { "id": 1, "name": "Bottled Water", "quantity": 47, "low_stock": false }
}
```

### Example 4: A delivery arrives (increase stock)

**You send:** `PATCH /api/products/1/stock`
```json
{ "change": 20 }
```
Quantity goes from 47 up to 67.

### Example 5: Trying to sell more than we have (rejected ❌)

**You send:** `PATCH /api/products/1/stock`
```json
{ "change": -500 }
```

**You get back:** status `400 Bad Request`
```json
{
  "success": false,
  "message": "Not enough stock. Available: 67, requested: 500"
}
```

### Example 6: Which products are running low?

**You send:** `GET /api/products/low-stock`

**You get back:** every product where `quantity` is at or below its `low_stock_threshold`, so Ama knows what to reorder.

### Example 7: Asking for something that doesn't exist

**You send:** `GET /api/products/9999`

**You get back:** status `404 Not Found`
```json
{
  "success": false,
  "message": "Product with id 9999 not found"
}
```

### Example 8: Sending bad data

**You send:** `POST /api/products`
```json
{ "name": "", "price": -10, "quantity": 5 }
```

**You get back:** status `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "name is required",
    "price must be a positive number",
    "category_id is required"
  ]
}
```

---

## 5. All the endpoints

### Categories

| Method | Endpoint | What it does | Success code |
|---|---|---|---|
| `POST` | `/api/categories` | Create a category | `201` |
| `GET` | `/api/categories` | List all categories | `200` |
| `GET` | `/api/categories/:id` | Get one category | `200` |
| `PUT` | `/api/categories/:id` | Update a category | `200` |
| `DELETE` | `/api/categories/:id` | Delete a category (blocked if it still has products) | `200` |

### Products

| Method | Endpoint | What it does | Success code |
|---|---|---|---|
| `POST` | `/api/products` | Add a product | `201` |
| `GET` | `/api/products` | List all products | `200` |
| `GET` | `/api/products/low-stock` | List products that are low on stock | `200` |
| `GET` | `/api/products/:id` | Get one product | `200` |
| `PUT` | `/api/products/:id` | Update a product's details | `200` |
| `PATCH` | `/api/products/:id/stock` | Add or remove stock (`change` can be positive or negative) | `200` |
| `DELETE` | `/api/products/:id` | Delete a product | `200` |

**Optional filters** on `GET /api/products`:

- `?category_id=1` → only products in that category
- `?search=water` → products whose name contains "water"

> **Developer note:** declare `/low-stock` **before** `/:id` in the products routes file. Otherwise Express treats the word "low-stock" as an id.

### Error status codes we use

| Code | Meaning | When |
|---|---|---|
| `200` | OK | Request worked |
| `201` | Created | A new record was added |
| `400` | Bad Request | Invalid or missing data, or a stock rule was broken |
| `404` | Not Found | The id doesn't exist |
| `409` | Conflict | Duplicate name, or deleting a category that still has products |
| `500` | Server Error | Something unexpected broke on our side |

---

## 6. How the data is organised

Two tables linked by a foreign key:

```
categories                      products
┌────────────┬────────┐         ┌────────────────────┬───────────┐
│ id (PK)    │ 1      │◄────────│ category_id (FK)   │ 1         │
│ name       │ Drinks │         │ id (PK)            │ 1         │
└────────────┴────────┘         │ name               │ Water     │
                                │ price              │ 5.00      │
   One category                 │ quantity           │ 50        │
   has MANY products            │ low_stock_threshold│ 10        │
                                └────────────────────┴───────────┘
```

---

## 7. Tech stack

- **Node.js**: runs JavaScript on the server
- **Express.js**: handles the routes (endpoints)
- **SQLite** (via `better-sqlite3`): the SQL database, saved as a single file
- **Postman**: used to test every endpoint
- **Git and GitHub**: team collaboration

---

## 8. Folder structure

```
product-inventory-api/
├── src/
│   ├── config/
│   │   └── db.js                  # database connection + creates tables
│   ├── routes/
│   │   ├── categoryRoutes.js      # category addresses
│   │   └── productRoutes.js       # product addresses
│   ├── controllers/
│   │   ├── categoryController.js      # category requests (Akata692)
│   │   ├── productController.js       # product create + read (anonymous371)
│   │   ├── productModifyController.js # product update + delete (Damian-404)
│   │   └── stockController.js         # stock changes + low stock (kellscaleb)
│   ├── middleware/
│   │   ├── validate.js            # checks incoming data
│   │   └── errorHandler.js        # catches errors, sends clean replies
│   ├── utils/
│   │   └── seed.js                # optional sample data
│   ├── app.js                     # sets up Express and connects the routes
│   └── server.js                  # starts the server
├── postman/
│   └── product-inventory-api.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

**How a request travels:**
`Request → Route (which address?) → Validation (is the data okay?) → Controller (do the work) → Database → Response`
If anything goes wrong along the way, the **error handler** sends a clean error message back.

---

## 9. Getting started

You need [Node.js](https://nodejs.org) (**v20 or newer**) and [Git](https://git-scm.com).

```bash
# 1. Clone the repo
git clone https://github.com/<owner>/product-inventory-api.git
cd product-inventory-api

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. (Optional) Fill the database with sample data
npm run seed

# 5. Start the server
npm run dev
```

The API runs at **http://localhost:3000**. Try opening `http://localhost:3000/api/products` in your browser.

---

## 10. 👥 Team and responsibilities

Each person owns **one piece** of the project and works on it in their **own branch**.

| # | Member (GitHub) | Responsibility | Branch name | Your file |
|---|---|---|---|---|
| 1 | **Logical883** (Project Lead) | Project setup, folder structure, database connection, tables, seed data, wiring `app.js` and all routes, reviewing and merging PRs | `feature/project-setup` | `config/`, `routes/`, `app.js`, `utils/seed.js` |
| 2 | **Akata692** | Categories: all 5 endpoints | `feature/categories` | `controllers/categoryController.js` |
| 3 | **anonymous371** | Products: create (`POST`) and read (`GET` all, `GET` by id, filters) | `feature/products-create-read` | `controllers/productController.js` |
| 4 | **Damian-404** | Products: update (`PUT`) and delete (`DELETE`) | `feature/products-update-delete` | `controllers/productModifyController.js` |
| 5 | **kellscaleb** (Caleb Acquaye) | Stock logic: `PATCH /stock`, `GET /low-stock`, negative-quantity and insufficient-stock rules | `feature/stock-logic` | `controllers/stockController.js` |
| 6 | **Kisha-a11y** | Validation middleware for categories and products | `feature/validation` | `middleware/validate.js` |
| 7 | **S580-maker** (Stephen Obodai) | Error handling: central error handler, 404 for unknown routes, consistent response format | `feature/error-handling` | `middleware/errorHandler.js` |
| 8 | **SWAG-08** | Postman collection: a request for every endpoint, including failure cases, plus the presentation outline | `feature/postman-tests` | `postman/` folder |

> Everyone also contributes to the final **5-slide presentation** and the **live demo**.

**How the starter code works:** the project already runs. All routes are connected in `src/routes/`, and every controller and the validation file contain **placeholder functions** that reply `501 Not implemented yet`. Open **your file**, find the placeholder functions (each one has comments explaining what to build), and replace them with real code. You should not need to edit anyone else's file.

---

## 11. 🌿 Git workflow (everyone must follow this)

**Golden rules**
1. **Never commit directly to `main`.** It must always contain working code.
2. **Every person works on their own branch**, named as in the table above.
3. **Make small, clear commits** like `add create category endpoint`, not `update` or `changes`.
4. **Merge through Pull Requests**, and the Project Lead reviews and merges them.

**Step by step**

```bash
# 1. Make sure you have the latest code
git checkout main
git pull origin main

# 2. Create your own branch (use YOUR branch name from the table)
git checkout -b feature/your-branch-name

# 3. Do your work, then save it in small steps
git add .
git commit -m "describe what you did"

# 4. Upload your branch to GitHub
git push origin feature/your-branch-name
```

5. On GitHub, click **Compare & pull request**, write a short description of what you built, and request a review.
6. The Project Lead reviews and **merges** it into `main`.
7. After a merge, everyone updates their branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-branch-name
   git merge main
   ```

**Before you start:** wait until the Project Lead merges `feature/project-setup` into `main`, then pull `main` and create your branch from it. This ensures everyone starts from the same foundation.

**Avoiding merge conflicts:** only edit the files that belong to your piece. If you must change a file someone else owns, tell them first.

**Set your Git identity** so your commits are credited to you on GitHub:
```bash
git config user.name "Your Name"
git config user.email "the-email-on-your-github-account"
```

---

## 12. Code rules (from the project guide)

- Each API has clear, consistent routes using Express.js
- Code is clean, readable and well-commented
- Testing is done in Postman, and the collection is shared in `/postman`
- Every member has commits in the repository

---

## 13. Roadmap

- [ ] Project setup and database
- [ ] Categories CRUD
- [ ] Products CRUD
- [ ] Stock logic
- [ ] Validation
- [ ] Error handling
- [ ] Postman collection
- [ ] Merge all branches and test together
- [ ] *(Optional)* JWT authentication
- [ ] 5-slide presentation
- [ ] Live demo

---

Made by the team: Logical883, Akata692, anonymous371, Damian-404, kellscaleb, Kisha-a11y, S580-maker, SWAG-08.
