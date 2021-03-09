const mongoose = require('mongoose');
let productSchema = new mongoose.Schema({
	SKU: String,
	uid: {
		type: String,
		required: [true, 'uuid is required'],
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	dateAdded: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);
