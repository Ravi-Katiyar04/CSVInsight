import csvtojson from 'csvtojson';
import Product from '../models/product.model.js';

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
            Product.insertMany(productData);    
            res.send({status:200, message: 'File successfully' });
        });
    } catch (error) {
        res.send({status:400, message: error.message });
    }
}