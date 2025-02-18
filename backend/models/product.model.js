import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    flavour:{
        type: String,
    },
    size:{
        type: String,
    },
    price: {
        type: Number,
    },
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;