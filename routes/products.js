import {Router} from "express";
import db from "../models";
export const products = Router();
const Product = db.product;

products.get('/', (req, res) => {
	Product.findAll().then(data => {
		res.json(data)
	});
});

products.param('id', function (req, res, next, id) {
	if (req.method.toLowerCase() === 'get') {
		Product.findById(id).then(data => {
			if (data) {
				req.product = data;
				next()
			} else {
				res.sendStatus(404)
			}
		}).catch(e => {
			console.log(e)
			res.sendStatus(404)
		})
	} else {
		next();
	}

});

products.route('/:id')
	.get(function (req, res) {
		res.send(JSON.stringify(req.product))
	})
	.post(function (req, res) {
		let newProduct = req.body;
		newProduct.id = req.params.id;
		Product.create(newProduct).then(()=>{
			res.send(req.body);
		});
	});


products.get('/:id/reviews', (req, res) => {
	const review = req.product.reviews || 'No Reviews';
	res.end(JSON.stringify(review))
});