import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectToDB from './db/db.js';
import Router from './routes/route.js';


const app = express();
connectToDB();

app.use(cors());
app.use(express.json());

app.use('/', Router);
    

export default app;