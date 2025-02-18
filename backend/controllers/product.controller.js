import csvtojson from 'csvtojson';
import ProductModel from '../models/product.model.js';

export const importProduct = async (req, res) => {
    try {
        const productData=[];
        csvtojson().fromFile(req.file.path).then(async (data) => {
            data.forEach(async (product) => {
                productData.push({
                    id: product.id,
                    name: product.name,
                    flavour: product.flavour,
                    size: product.size,
                    price: product.price
                });
            });                    
            ProductModel.insertMany(productData);    
            res.send({status:200, message: 'File successfully', fileType: 'product'});
        });
    } catch (error) {
        res.send({status:400, message: error.message });
    }
}