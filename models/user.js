const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: [true, 'uuid is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
	username: {
		firstName: { type: String, required: [true, 'First Name is required'] },
		lastName: { type: String },
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	dateJoined: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
