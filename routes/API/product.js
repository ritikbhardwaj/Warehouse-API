const express = require('express'),
	router = express.Router();

const joi = require('joi');
const checkAuth = require('../../utils/checkAuth');
const { Product, userData } = require('../../database');
const jwt = require('jsonwebtoken');
const getDate = require('../../utils/getDate');

// All the routes are protected routes

//GET all the products
router.get('/products', checkAuth, (req, res) => {
	jwt.verify(
		req.cookies.authCookie,
		process.env.ACCESS_TOKEN_SECRET,
		function (err, decoded) {
			Product.find({ uid: decoded.uid })
				.then((results) => {
					res.status(200).send(results);
				})
				.catch((err) => {
					res.status(404).send({
						err: true,
						code: 404,
						message: err,
					});
				});
		}
	);
});

//GET a particular product
router.get('/products/:SKU', checkAuth, (req, res) => {
	const { SKU } = req.params;
	Product.find({ SKU })
		.then((result) => {
			if (result.length == 0) {
				res.status(500).send({
					err: true,
					code: 500,
					message: 'Product not found.',
				});
			} else {
				res.status(200).send(result);
			}
		})
		.catch((err) => {
			res.status(404).send({ err: true, code: 404, message: err });
		});
});

//INSERT a new object (not checking if the product already exists)
router.post('/products', checkAuth, (req, res) => {
	console.log(req.body);
	//object is empty
	if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
		res.status(400).send({
			err: true,
			code: 400,
			message: 'Bad request.',
		});
	} else {
		//find the uid of the user with given email
		userData.find({ email: req.body.email }).then((user) => {
			let product = {
				SKU: Date.now(),
				uid: user[0].uid,
				title: req.body.title,
				description: req.body.description,
				quantity: req.body.quantity,
				price: req.body.price,
				dateAdded: getDate(),
			};
			let newProduct = new Product(product);
			newProduct.save((err, result) => {
				if (err) {
					res.status(501).send({
						err: true,
						code: 501,
						message: err,
					});
				} else {
					res.status(200).send({
						err: false,
						code: 200,
						message: 'Product created successfully!',
					});
				}
			});
		});
	}
});

//UPDATE a product
router.put('/products', checkAuth, (req, res) => {
	const { SKU, updateObj } = req.body;
	//make sure the update object is not empty
	let newObj = {};
	//if the newObject is empty then no need to do anything, infact it's a bad request!
	// if (Object.keys(newObj).length === 0 && newObj.constructor === Object) {
	// 	res.status(400).send({
	// 		err: true,
	// 		errCode: 400,
	// 		message: 'Bad request.',
	// 	});
	// } else {
	Product.find({ SKU }).then((results) => {
		Object.keys(updateObj).forEach((key) => {
			if (updateObj[key] != '') {
				newObj[key] = updateObj[key];
			}
		});

		let queryObj = Object.assign(results[0], newObj);
		Product.updateOne({ SKU }, queryObj)
			.then((result) => {
				res.status(200).send({
					err: false,
					code: 200,
					message: 'Successfully updated.',
				});
				// if (!result.nModified) {
				// 	res.status(501).send({
				// 		err: true,
				// 		errCode: 501,
				// 		message: 'No product updated.',
				// 	});
				// } else {
				// 	res.status(200).send(result);
				// }
			})
			.catch((err) => {
				res.status(500).send({
					err: true,
					code: 500,
					message: err,
				});
			});
	});
	//}
});

//DELETE a product
router.delete('/products/:id', checkAuth, (req, res) => {
	const { id } = req.params;
	Product.deleteOne({ SKU: id })
		.then((result) => {
			if (!result.deletedCount) {
				res.status(501).send({
					err: true,
					code: 501,
					message: 'No product deleted!',
				});
			} else {
				res.status(200).send({
					err: false,
					code: 200,
					message: result,
				});
			}
		})
		.catch((err) => {
			res.status(501).send({
				err: true,
				code: 501,
				message: err,
			});
		});
});

module.exports = router;
