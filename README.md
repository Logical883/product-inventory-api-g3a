# 📦 Product Inventory API: Layered Architecture Approach

A backend project that helps a shop keep track of **what it sells**, **how much of it is left**, and **when it's time to restock**.

Built with **Express.js**, with **no database** (data is kept in memory), for the Backend Development group project on [betechified.com](https://betechified.com).

> **Our approach:** *Layered architecture.* Every request travels through **Routes → Controllers → Services → Repositories**, and the data sits in a JavaScript **`Map`**. Each layer has exactly one job. Section 4 explains this in plain English.

---

## 1. What is this project? (The simple version)

Imagine a shop owner named **Ama** who sells drinks, snacks and stationery.

Right now she writes everything in a notebook:

- "Bottled water: 50 left"
- "Notebook: 25 left"
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
| **API** | A "waiter" between an app and the data. The app places an order ("give me all products") and the API brings back the result. |
| **Endpoint** | One specific thing the API can do. Each has its own address, like `/api/products`. |
| **CRUD** | The four basic things you can do with any data: **C**reate, **R**ead, **U**pdate, **D**elete. |
| **In-memory storage** | The data lives in the computer's memory while the server runs. Our brief says *no database*, so this is how we keep data. When the server stops, the data resets to the starting data. |
| **Map** | A JavaScript container that stores items by a key. Ours uses the product's `id` as the key, so finding product 7 is instant. Think of a shelf where every box has a number label. |
| **Layered architecture** | Splitting the code into layers where each layer does one job (see section 4). |
| **Route** | Matches an address (like `GET /api/products`) to the code that should handle it. |
| **Controller** | Takes the request, passes it on, and sends back the reply. |
| **Service** | Where the **rules** live (like "you can't sell more than you have"). |
| **Repository** | The only code allowed to touch the stored data (the Map). |
| **Middleware** | Code that runs *in the middle*, before the controller, such as checking the data is valid. |
| **Validation** | Checking that what someone sends makes sense (a price can't be negative). |
| **Status code** | A number in the reply that tells you how it went: `201` created, `400` you sent something wrong, `404` not found. |
| **JSON** | The format the data is written in, like `{ "name": "Bottled Water" }`. |

---

## 3. What the system does

### Categories
Groups that products belong to, such as *Drinks*, *Snacks*, *Stationery*.

| Field | Example |
|---|---|
| `id` | `1` (given automatically) |
| `name` | `"Drinks"` |
| `createdAt` | `"2026-10-22T09:00:00.000Z"` |

### Products
The actual items in the shop.

| Field | Example | Meaning |
|---|---|---|
| `id` | `1` | Unique number given automatically |
| `name` | `"Bottled Water"` | What it's called |
| `description` | `"500ml bottle"` | Extra details (optional) |
| `price` | `5.0` | Cost of one item |
| `quantity` | `50` | How many are in stock right now |
| `lowStockThreshold` | `10` | The warning level: at or below this, it's "low stock" |
| `categoryId` | `1` | Which category it belongs to |
| `createdAt` / `updatedAt` | | Timestamps, filled in automatically |
| `lowStock` | `false` | Added to replies: `true` when `quantity <= lowStockThreshold` |

### The business rules (the "smart" part)

1. **Quantity can never be negative.** You can't have -5 bottles of water.
2. **You can't sell more than you have.** If there are 3 left and someone tries to remove 10, the API says no.
3. **Low stock warning.** When `quantity` is at or below `lowStockThreshold`, the product is flagged `lowStock: true`.
4. **A product must belong to a real category.** `categoryId` has to match an existing category.
5. **A category that still has products can't be deleted.** Otherwise those products would be left without a category.
6. **Names must be unique.** Two products (or two categories) can't share a name, ignoring capital letters.

---

## 4. 🧱 The layered architecture explained

### The restaurant analogy

Think of how a good restaurant works:

| Restaurant | Our code | Its one job |
|---|---|---|
| The **signboard / front door** that sends you to the right counter | **Routes** | Match the address to the right controller. |
| The **security check** at the door | **Middleware (validation)** | Reject bad requests before they go further. |
| The **waiter** | **Controller** | Take the order, hand it to the kitchen, bring back the food. Doesn't cook. |
| The **chef** | **Service** | Follow the recipes and the rules. Refuses bad orders ("we're out of that"). |
| The **storeroom keeper** | **Repository** | The only person allowed to touch the shelves. Fetches and stores things. |
| The **shelves** | **The `Map`** | Where the ingredients (data) actually sit. |

The waiter never goes into the storeroom, and the storeroom keeper never talks to customers. Each person sticks to their job.

### The diagram

```
  Client (Postman, a website, a phone app)
        │   HTTP request, e.g. PATCH /api/products/1/stock
        ▼
  ┌──────────────────┐
  │      ROUTES      │  "Which address is this? Send it to the right controller."
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │    MIDDLEWARE    │  "Is the data valid?"  (validate.js)
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │    CONTROLLER    │  Reads the request, calls ONE service function, sends the reply.
  └────────┬─────────┘
           ▼
  ┌──────────────────┐
  │     SERVICE      │  Business rules: "Is there enough stock? Is it a duplicate?"
  └────────┬─────────┘                (throws an AppError when a rule is broken)
           ▼
  ┌──────────────────┐
  │    REPOSITORY    │  Finds, saves, updates and deletes. Nothing else.
  └────────┬─────────┘
           ▼
       Map (memory)

  If anything throws an error on the way ──► ERROR HANDLER ──► clean error reply
```

### A real journey: "Ama sells 3 bottles of water"

`PATCH /api/products/1/stock` with body `{ "change": -3 }`

1. **Route** sees `PATCH /api/products/:id/stock` and sends it onward.
2. **Validation** checks that `id` is a proper number and `change` is a whole number that isn't 0. ✅
3. **Controller** reads `id = 1` and `change = -3` and calls `stockService.adjustStock(1, -3)`.
4. **Service** asks the repository for product 1 and finds `quantity: 50`. It checks the rule: removing 3 from 50 is fine. It asks the repository to save `quantity: 47`, and adds `lowStock: false`.
5. **Repository** updates the product inside the `Map` and hands it back.
6. **Controller** sends the reply: `200 OK` with the updated product.

If Ama tried to sell 500, step 4 would **throw an error** (`400 Not enough stock`). The controller never needs to catch it. The **error handler** picks it up and sends a clean reply.

### The rules each layer must follow

| Layer | ✅ It does | ❌ It must NOT |
|---|---|---|
| **Routes** | Connect addresses to controller functions | Contain any logic |
| **Controller** | Read `req`, call one service function, send `res` | Contain business rules or touch the Map |
| **Service** | Business rules, throw `AppError` when something is wrong | Use `req`/`res`, or touch the Map directly |
| **Repository** | Store, find, update, delete data in the Map | Make decisions (no stock checks, no 404s) |

**No skipping layers.** A controller never calls a repository directly. Everything goes controller → service → repository.

### Why we chose this approach

- **Easy to read and explain:** every file has one clear job, which makes for a good presentation.
- **Easy to split between teammates:** each person owns separate files, so we rarely clash in Git.
- **Easy to change later:** if we ever added a database, only the repositories would change. Controllers and services wouldn't notice.
- **Easy to test:** rules in the service can be tested without touching HTTP.

---

## 5. How the data is stored (no database)

The brief says the API must work **without a database**, so the repositories keep everything in a `Map`:

```js
const products = new Map();   // key = id, value = the product

products.set(1, { id: 1, name: 'Bottled Water', quantity: 50, ... });
products.get(1);      // finds product 1 instantly
products.delete(1);   // removes it
[...products.values()]; // all products as a list
```

- **Starting data:** when the server starts, the repositories load the sample items from `src/data/seedData.js` (3 categories, 6 products). That means the API is never empty during the demo.
- **Resets on restart:** anything added while the server runs is lost when it stops. This is normal for in-memory storage and is fine for the project.
- **IDs:** each repository keeps a counter (`nextId`) that goes up by one every time something is created.

---

## 6. Examples, step by step

These show what you send and what you get back. (The starting data is already loaded, so product `1` is Bottled Water with 50 in stock.)

### Example 1: Create a category

**You send:** `POST /api/categories`
```json
{ "name": "Toiletries" }
```
**You get back:** status `201 Created`
```json
{
  "success": true,
  "data": { "id": 4, "name": "Toiletries", "createdAt": "2026-10-22T09:00:00.000Z" }
}
```

### Example 2: Add a product

**You send:** `POST /api/products`
```json
{
  "name": "Hand Soap",
  "description": "250ml bottle",
  "price": 15.0,
  "quantity": 30,
  "lowStockThreshold": 8,
  "categoryId": 4
}
```
**You get back:** status `201 Created`
```json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "Hand Soap",
    "description": "250ml bottle",
    "price": 15,
    "quantity": 30,
    "lowStockThreshold": 8,
    "categoryId": 4,
    "lowStock": false
  }
}
```

### Example 3: Someone buys 3 bottles of water (reduce stock)

**You send:** `PATCH /api/products/1/stock`
```json
{ "change": -3 }
```
**You get back:** status `200 OK`
```json
{
  "success": true,
  "data": { "id": 1, "name": "Bottled Water", "quantity": 47, "lowStock": false }
}
```

### Example 4: A delivery arrives (increase stock)

**You send:** `PATCH /api/products/1/stock`
```json
{ "change": 20 }
```
Quantity goes from 47 up to 67.

### Example 5: Trying to sell more than we have ❌

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

**You get back:** status `200 OK`, with every product where `quantity <= lowStockThreshold`:
```json
{
  "success": true,
  "data": [
    { "id": 2, "name": "Orange Juice", "quantity": 8, "lowStockThreshold": 10, "lowStock": true },
    { "id": 3, "name": "Biscuits", "quantity": 3, "lowStockThreshold": 5, "lowStock": true }
  ]
}
```

### Example 7: Asking for something that doesn't exist

**You send:** `GET /api/products/9999`

**You get back:** status `404 Not Found`
```json
{ "success": false, "message": "Product with id 9999 not found" }
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
    "price must be a number that is 0 or more",
    "categoryId is required"
  ]
}
```

### Example 9: Deleting a category that still has products

**You send:** `DELETE /api/categories/1`

**You get back:** status `409 Conflict`
```json
{ "success": false, "message": "Cannot delete category: it still has 2 product(s)" }
```

---

## 7. All the endpoints

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

- `?categoryId=1` → only products in that category
- `?search=water` → products whose name contains "water"

### Status codes we use

| Code | Meaning | When |
|---|---|---|
| `200` | OK | Request worked |
| `201` | Created | A new record was added |
| `400` | Bad Request | Invalid or missing data, or a stock rule was broken |
| `404` | Not Found | The id (or the route) doesn't exist |
| `409` | Conflict | Duplicate name, or deleting a category that still has products |
| `500` | Server Error | Something unexpected broke on our side |

### Reply format (everyone must follow this)

```json
{ "success": true,  "data": { } }
{ "success": false, "message": "What went wrong", "errors": ["optional list of details"] }
```

---

## 8. Folder structure

```
product-inventory-api/
├── src/
│   ├── routes/                     LAYER 1: addresses
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/                 checks that run before the controller
│   │   ├── validate.js             validation (Kisha-a11y)
│   │   ├── errorHandler.js         clean error replies (S580-maker)
│   │   └── requestLogger.js        logs each request (S580-maker)
│   ├── controllers/                LAYER 2: the "waiters"
│   │   ├── categoryController.js   (Damian-404)
│   │   ├── productController.js    (anonymous371)
│   │   └── stockController.js      (kellscaleb)
│   ├── services/                   LAYER 3: the "chefs" (business rules)
│   │   ├── categoryService.js      (Damian-404)
│   │   ├── productService.js       (anonymous371)
│   │   └── stockService.js         (kellscaleb)
│   ├── repositories/               LAYER 4: the "storeroom keepers" (the Map)
│   │   ├── categoryRepository.js   (Akata692)
│   │   └── productRepository.js    (Akata692)
│   ├── data/
│   │   └── seedData.js             starting data
│   ├── utils/
│   │   ├── AppError.js             error with a status code
│   │   └── productHelpers.js       low-stock helper
│   ├── app.js                      sets up Express, connects everything
│   └── server.js                   starts the server
├── postman/                        Postman collection (SWAG-08)
├── docs/                           slides and demo notes
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 9. Tech stack

- **Node.js**: runs JavaScript on the server
- **Express.js**: handles the routes
- **In-memory `Map`**: stores the data (no database, as the brief requires)
- **Postman**: tests every endpoint
- **Git and GitHub**: team collaboration with branches and pull requests

---

## 10. Getting started

You need [Node.js](https://nodejs.org) (v18 or newer) and [Git](https://git-scm.com).

```bash
# 1. Clone the repo
git clone https://github.com/<owner>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the server (auto-restarts when you save)
npm run dev
```

The API runs at **http://localhost:3000**. Open it in your browser and you should see "Product Inventory API is running".

> **Right now** most endpoints reply `501 Not implemented yet`. That's expected! Each teammate replaces the placeholders in their own files (see the next section).

---

## 11. 👥 Team and responsibilities

Each person owns **their own files** and works on them in their **own branch**.

| # | Member (GitHub) | Responsibility | Branch | Your files |
|---|---|---|---|---|
| 1 | **Logical883** (Project Lead) | Project setup, wiring `app.js` and all routes, seed data, `AppError`, reviewing and merging PRs, final integration, demo coordination | `feature/project-setup` | `app.js`, `server.js`, `routes/`, `data/`, `utils/` |
| 2 | **Akata692** | **Repository layer**: both repositories (create the Maps, id counters, load the seed data, and all the find/create/update/remove functions) | `feature/repositories` | `repositories/categoryRepository.js`, `repositories/productRepository.js` |
| 3 | **anonymous371** | **Products**: service + controller for create, read (with filters), update and delete, including the category-exists and duplicate-name rules | `feature/products` | `services/productService.js`, `controllers/productController.js` |
| 4 | **Damian-404** | **Categories**: service + controller for all 5 endpoints, including the duplicate-name rule and "can't delete a category that has products" | `feature/categories` | `services/categoryService.js`, `controllers/categoryController.js` |
| 5 | **kellscaleb** (Caleb Acquaye) | **Stock logic**: service + controller for adjusting stock and the low-stock list, with the negative-quantity and not-enough-stock rules | `feature/stock-logic` | `services/stockService.js`, `controllers/stockController.js` |
| 6 | **Kisha-a11y** | **Validation**: `validateId`, `validateCategory`, `validateProduct`, `validateStockChange` | `feature/validation` | `middleware/validate.js` |
| 7 | **S580-maker** (Stephen Obodai) | **Error handling and logging**: improve the error handler and 404 reply, build the request logger | `feature/error-handling` | `middleware/errorHandler.js`, `middleware/requestLogger.js` |
| 8 | **SWAG-08** | **Postman collection** (a request for every endpoint, including failure cases), plus the **slides outline and demo-video script** | `feature/postman-docs` | `postman/`, `docs/` |

> **Everyone** also helps with the **5-slide presentation**, the **3 to 5 minute video demo**, and the live demo.

**How the starter code works:** the project already runs. All routes are connected, and every repository, service, controller and validator contains **placeholder functions** with comments explaining exactly what to build. Open **your files**, find the placeholders, and replace them with real code. You should not need to edit anyone else's file.

### The "contract": function names everyone relies on

Because teammates work at the same time, we agreed the function names in advance. **Do not rename them.**

| File | Functions |
|---|---|
| `categoryRepository` | `findAll()`, `findById(id)`, `findByName(name)`, `create(data)`, `update(id, changes)`, `remove(id)` |
| `productRepository` | `findAll()`, `findById(id)`, `findByName(name)`, `findByCategoryId(categoryId)`, `create(data)`, `update(id, changes)`, `remove(id)` |
| `categoryService` | `getAllCategories()`, `getCategoryById(id)`, `createCategory(data)`, `updateCategory(id, data)`, `deleteCategory(id)` |
| `productService` | `getAllProducts(filters)`, `getProductById(id)`, `createProduct(data)`, `updateProduct(id, data)`, `deleteProduct(id)` |
| `stockService` | `adjustStock(id, change)`, `getLowStockProducts()` |

The services call the repositories, so until Akata's repositories are merged you can't run your service end to end. **Akata, please merge first.** Until then, read the comments to see what each repository function will return and write your code against that.

---

## 12. 🌿 Git workflow (everyone must follow this)

**Golden rules**
1. **Never commit directly to `main`.** It must always contain working code.
2. **Every person works on their own branch**, named as in the table above.
3. **Make small, clear commits** like `add create product service`, not `update` or `changes`.
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
git push -u origin feature/your-branch-name
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

**Merge order**
1. `feature/project-setup` goes first. **Don't create your branch until it is merged.**
2. `feature/repositories` goes second, because every service depends on it.
3. All the others can merge in any order after that.
4. Last: end-to-end testing, then the Postman collection is finalised.

**Avoiding merge conflicts:** only edit the files that belong to you. If you must change someone else's file, tell them first.

**Set your Git identity** so your commits are credited to you on GitHub:
```bash
git config user.name "Your Name"
git config user.email "the-email-on-your-github-account"
```

---

## 13. Code rules (from the project guide)

- Clear, consistent routes using Express.js
- Code is clean, readable and well-commented
- Testing is done in Postman, and the collection is shared in `/postman`
- Every member has commits and pull requests in the repository
- **No database.** All data lives in memory.

---

## 14. Roadmap and deliverables

- [ ] Project setup merged to `main`
- [ ] Repositories (Maps, seed data loaded)
- [ ] Categories service + controller
- [ ] Products service + controller
- [ ] Stock logic
- [ ] Validation
- [ ] Error handling and request logger
- [ ] Merge all branches and test together
- [ ] Postman collection
- [ ] 5-slide presentation
- [ ] 3 to 5 minute video demo
- [ ] Live demo

**What we submit:** the GitHub repository link (with commits from all members), the presentation slides link, the 3 to 5 minute video demo, and the Postman collection.

---

Made by the team: Logical883, Akata692, anonymous371, Damian-404, kellscaleb, Kisha-a11y, S580-maker, SWAG-08.
