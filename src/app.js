import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'node:url';
import routes from './router.js';
import 'dotenv/config';

const app = express();
const uploadsDirectory = fileURLToPath(new URL('../uploads/', import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/categories-file', express.static(uploadsDirectory));
app.use('/product-file', express.static(uploadsDirectory));
app.use(routes);

export default app;