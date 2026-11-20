import { Router } from "express";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import CatergoryController from "./app/controllers/CategoryController.js"
import multerConfig from "./config/multer.cjs";
import multer from "multer";
import authMiddleware from './middlewares/auth.js'
import adminMiddleware from "./middlewares/admin.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.get("/users", UserController.index);

routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post("/products", adminMiddleware, upload.single("file"), ProductController.store);
routes.put("/products/:id", adminMiddleware, upload.single("file"), ProductController.update);
routes.get("/products", ProductController.index);

routes.post("/categories", adminMiddleware, upload.single("file"), CatergoryController.store);
routes.put("/categories/:id", adminMiddleware, upload.single("file"), CatergoryController.update);
routes.get("/categories", CatergoryController.index);

routes.post("/orders", OrderController.store);
routes.put("/orders/:id", adminMiddleware, upload.single("file"), OrderController.update);
routes.get("/orders", OrderController.index);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
