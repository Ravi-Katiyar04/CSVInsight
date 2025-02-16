import express from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import {importProduct} from '../controllers/product.controller.js';
const productRoute = express();

productRoute.use(bodyParser.urlencoded({ extended: true }));

productRoute.use(express.static(path.resolve('public')));

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


productRoute.post('/uploadFile', upload.single('file'), importProduct);

export default productRoute;