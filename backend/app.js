import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectToDB from './db/db.js';
import Router from './routes/route.js';
import EmployeeModel from './models/employee.model.js';
import ProductModel from './models/product.model.js';

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());

app.use('/', Router);

app.get('/getEmployeeData', (req, res) => {
    EmployeeModel.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json({error: "error fetching employees"+err}));    
}); 

app.get('/getProducData', (req, res) => {
    ProductModel.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json({error: "error fetching employees"+err}));    
});     

export default app;