import {Router} from "express";
import db from "../mongodb/";
export const cities = Router();
const City = db.model('City');

cities.get('/', (req, res) => {
	City.find({}, (err, data) => {
		res.json(data)
	})
})
	.post(function (req, res) {
		let newCity = new City(req.body)
		newCity.save((err, created) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).send(created);
		});
	});

cities.param('id', function (req, res, next, id) {
	if (req.method.toLowerCase() === 'get') {
		City.findById(id, (err, data) => {
			if (data) {
				req.city = data;
				next()
			} else {
				res.sendStatus(404)
			}
		})
	} else {
		next();
	}

});

cities.route('/:id')
	.get(function (req, res) {
		res.send(JSON.stringify(req.city))
	})
	.put(function (req, res) {
		City.findById(req.params.id, (err, city) => {
			if (err) {
				res.status(500).send(err);
			} else if (!city) {
				res.status(404)
			} else {
				let updatedCity = Object.assign(city, req.body);
				updatedCity.save((err, todo) => {
					if (err) {
						res.status(500).send(err)
					}
					res.status(200).send(todo);
				});
			}
		});
	})
	.delete(function (req, res) {
		City.findByIdAndRemove(req.params.id, (err, {id}) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).send(`City #${id} successfully deleted`);
		});
	});

//Return random city

cities.get('/city/any', (req, res) => {
	City.count().exec((err, count) => {
		let random = Math.floor(Math.random() * count);
		City.findOne().skip(random).exec(
			(err, data) => {
				if (err) {
					res.sendStatus(404)
				}
				res.json(data)
			});
	})
});
