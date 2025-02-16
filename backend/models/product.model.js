import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
    },
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

const Product = mongoose.model("Product", productSchema);

export default Product;