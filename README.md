# Product Inventory API

REST API for a small shop inventory. It stores categories and products, records sales and restocks, and flags items that are running low.

The API is built with Node.js and Express. There is no database. Data is held in memory and reloads from seed data every time the server starts.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
git clone https://github.com/Logical883/product-inventory-api-g3a.git
cd product-inventory-api-g3a
npm install
npm run dev
```

The server listens on [http://localhost:3000](http://localhost:3000). `npm start` runs it once. `npm run dev` restarts it when you save a file.

Set `PORT` if you need a different port. The default is `3000`.

A Postman collection covering the success and failure cases is in `postman/product-inventory-api.postman_collection.json`.

## Architecture

Each request passes through one layer at a time:

```
Route → Middleware → Controller → Service → Repository → Map
```

| Layer | Responsibility |
| --- | --- |
| Route | Matches a URL and HTTP method to a controller. |
| Middleware | Checks the request and logs it. Validation failures stop here with `400`. |
| Controller | Reads the request, calls one service function, and sends the response. |
| Service | Applies the business rules and throws `AppError` when a rule fails. |
| Repository | Reads and writes the in-memory `Map`. It does not decide whether a request is allowed. |

Errors thrown in a service are handled in one place, `src/middleware/errorHandler.js`, so controllers do not need their own `try/catch`.

## Business rules

- A product name and a category name must be unique, ignoring letter case.
- A product must belong to an existing category.
- Stock cannot drop below zero. Selling more than the available quantity returns `400`.
- Reaching exactly zero is allowed. That product is then low stock.
- A product is low stock when `quantity <= lowStockThreshold`.
- A category cannot be deleted while products still belong to it.

## Response format

```json
{ "success": true, "data": {} }
```

```json
{ "success": false, "message": "What went wrong", "errors": ["optional details"] }
```

`errors` is included only for validation failures.

| Status | When |
| --- | --- |
| `200` | The request succeeded. |
| `201` | A category or product was created. |
| `400` | The input is invalid, the category does not exist, or there is not enough stock. |
| `404` | The id or route does not exist. |
| `409` | The name is already used, or the category still has products. |
| `500` | An unexpected server error. |

## Endpoints

### Categories

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/categories` | Create a category. Body: `{ "name": "Toiletries" }` |
| `GET` | `/api/categories` | List categories. |
| `GET` | `/api/categories/:id` | Get one category. |
| `PUT` | `/api/categories/:id` | Rename a category. Body: `{ "name": "Personal Care" }` |
| `DELETE` | `/api/categories/:id` | Delete a category that has no products. |

### Products

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/products` | Create a product. |
| `GET` | `/api/products` | List products. |
| `GET` | `/api/products/low-stock` | List products at or below their threshold. |
| `GET` | `/api/products/:id` | Get one product. |
| `PUT` | `/api/products/:id` | Replace a product's details. |
| `PATCH` | `/api/products/:id/stock` | Change stock. Body: `{ "change": -3 }` |
| `DELETE` | `/api/products/:id` | Delete a product. |

`GET /api/products` accepts two optional query parameters:

- `categoryId` — only products in that category
- `search` — products whose name contains the text, ignoring letter case

Create and update product body:

```json
{
  "name": "Hand Soap",
  "description": "250ml bottle",
  "price": 15,
  "quantity": 30,
  "lowStockThreshold": 8,
  "categoryId": 1
}
```

`description`, `quantity`, and `lowStockThreshold` may be omitted. Omitted quantity defaults to `0` on create. Omitted threshold defaults to `10` on create. `price` and `categoryId` are required. Numbers must be sent as JSON numbers, not strings.

A negative `change` records a sale. A positive `change` records a restock. `0` is rejected.

Example sale:

```http
PATCH /api/products/1/stock
```

```json
{ "change": -3 }
```

If the sale would make the quantity negative:

```json
{
  "success": false,
  "message": "Not enough stock. Available: 50, requested: 500"
}
```

## Data

Seed data loads on startup from `src/data/seedData.js`: 3 categories and 6 products. Orange Juice and Biscuits begin below their low-stock thresholds.

Anything created while the server is running is discarded on restart.

## Project layout

```
src/
├── routes/            URL mapping
├── middleware/        validation, request log, error handling
├── controllers/       request and response
├── services/          business rules
├── repositories/      in-memory storage
├── data/seedData.js   starting categories and products
├── utils/             AppError and the low-stock helper
├── app.js             Express setup
└── server.js          process entry point
postman/               Postman collection
```
