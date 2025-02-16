import express from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import {importEmployee} from '../controllers/employee.controller.js';

const empRoute = express();

empRoute.use(bodyParser.urlencoded({ extended: true }));

empRoute.use(express.static(path.resolve('public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

empRoute.post('/uploadFile', upload.single('file'), importEmployee);

export default empRoute;

