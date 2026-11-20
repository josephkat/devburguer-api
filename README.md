# DevBurger API

REST API for a burger restaurant application. It provides user and session management, product and category administration, order storage, image uploads, and Stripe payment intents.

## Technologies

- Node.js
- Express
- PostgreSQL and Sequelize
- MongoDB and Mongoose
- JWT and bcrypt
- Multer
- Stripe
- Yup
- pnpm

## Requirements

- Node.js 20 or newer
- pnpm
- PostgreSQL
- MongoDB
- A Stripe account and secret key

## Environment variables

Create a `.env` file in the project root:

```env
PORT=3001

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DATABASE=dev-burguer-db

MONGO_URL=mongodb://localhost:27017/devburger
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

The database name defaults to `dev-burguer-db` when `DATABASE` is not set.

## Installation

```bash
pnpm install
```

Run the PostgreSQL migrations:

```bash
pnpm exec sequelize-cli db:migrate
```

Start the development server:

```bash
pnpm dev
```

The API runs at `http://localhost:3001` by default.

## Authentication

Protected routes require a JWT in the Authorization header:

```http
Authorization: Bearer <token>
```

Obtain a token through `POST /session`. Admin-only routes additionally require the authenticated user to have `admin: true`.

## API endpoints

### Public routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/users` | Create a user |
| GET | `/users` | List users |
| POST | `/session` | Authenticate and receive a JWT |

### Authenticated routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/orders` | Create an order |
| GET | `/orders` | List orders |
| GET | `/categories` | List categories |
| GET | `/products` | List products |
| POST | `/create-payment-intent` | Create a Stripe PaymentIntent |

### Admin routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/categories` | Create a category with an image |
| PUT | `/categories/:id` | Update a category |
| POST | `/products` | Create a product with an image |
| PUT | `/products/:id` | Update a product |
| PUT | `/orders/:id` | Update an order status |

## Image uploads

Uploaded files are stored in `uploads/` and exposed through:

- `http://localhost:3001/categories-file/<filename>`
- `http://localhost:3001/product-file/<filename>`

Send image fields as `multipart/form-data` using the field name `file`.

## Project structure

```text
src/
  app/
    controllers/   Request and response handlers
    models/        PostgreSQL Sequelize models
    schemas/       MongoDB Mongoose schemas
  config/          Database, authentication, and upload configuration
  database/
    migrations/    PostgreSQL migrations
  middlewares/     JWT and admin authorization middleware
  app.js           Express application
  router.js        API route definitions
  server.js        Application entry point
uploads/           Uploaded images
seeders/           Database seed data
```
