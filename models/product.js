const mongoose = require("mongoose");
let productSchema = new mongoose.Schema(
    {
        SKU: String,
        title: String,
        description: String,
        quantity: Number,
        price: Number
    }
);

module.exports = mongoose.model("Product", productSchema);