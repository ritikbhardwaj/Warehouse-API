const mongoose = require("mongoose");
let productSchema = new mongoose.Schema(
    {
        SKU: String,
        title:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        quantity:
        {
            type: Number,
            required: true
        },
        price:
        {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model("Product", productSchema);