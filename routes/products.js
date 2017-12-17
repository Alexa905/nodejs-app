import {Router} from "express";
import db from "../mongodb/";
export const products = Router();
const Product = db.model('Product');

products.get('/', (req, res) => {
	Product.find({}, (err, data) => {
		if (err) {
			console.log(err);
			res.statusCode(404);
		}
		res.json(data)
	});
});

products.param('id', function (req, res, next, id) {
	if (req.method.toLowerCase() === 'get') {
		Product.findOne({ id: id } ,(err, data) => {
			if (data) {
				req.product = data;
				next()
			} else {
				res.sendStatus(404)
			}
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
		let newProductModel = new Product(newProduct)
		newProductModel.save((err, createdProject) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).send(createdProject);
		});
	})
	.delete(function (req, res) {
		Product.findByIdAndRemove(req.params.id, (err, {id}) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).send(`Product #${id} successfully deleted`);
		});
	});


products.get('/:id/reviews', (req, res) => {
	const review = req.product.reviews || 'No Reviews';
	res.end(JSON.stringify(review))
});