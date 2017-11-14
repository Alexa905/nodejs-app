import {Router} from "express";
import EventEmitter from "events";
import {Importer} from "../modules";
export const products = Router();
const csvPath = './data/MOCK_DATA.csv';
const emitter = new EventEmitter();
const eventName = 'dirwatcher:changed';

const importer = new Importer(emitter, eventName);
const importedData = importer.importSync(csvPath);
const findProductById = paramId => importedData.find(({id}) => id === paramId);

products.get('/', (req, res) => {
	res.end(JSON.stringify(importedData))
});

products.param('id', function (req, res, next, id) {
	if (req.method.toLowerCase() === 'get') {
		const product = findProductById(id);
		if (product) {
			req.product = product;
			next();
		} else {
			res.sendStatus(404);
		}
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
		importedData.push(newProduct)
		res.send(req.body);
	});


products.get('/:id/reviews', (req, res) => {
	const review = req.product.reviews || 'No Reviews';
	res.end(JSON.stringify(review))
});