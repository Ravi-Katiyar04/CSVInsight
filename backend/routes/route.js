import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import {importEmployee} from '../controllers/employee.controller.js';
import {importProduct} from '../controllers/product.controller.js';
import {upload, detectCSVType} from '../middlewares/checkFile.middleware.js';

const Router = express();

Router.use(bodyParser.urlencoded({ extended: true }));

Router.use(express.static(path.resolve('public')));


Router.post('/uploadFile', upload.single('file'), detectCSVType, (req, res) => {
    if (req.csvType === "employee") {
        return importEmployee(req, res);
    } else if (req.csvType === "product") {
        return importProduct(req, res);
    } else {
        return res.status(400).json({ error: "CSV format not recognized. Please upload a valid Employee or Product CSV file." });
        }
    });

export default Router;

