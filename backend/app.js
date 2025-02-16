import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectToDB from './db/db.js';
import empRoute from './routes/employee.route.js';
import productRoute from './routes/product.route.js';

const app = express();

connectToDB();

app.use(cors());

app.use('/employee', empRoute);
app.use('/product', productRoute);


export default app;