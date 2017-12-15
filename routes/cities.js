import {Router} from 'express';
export const cities = Router();

import {City} from '../mongodb/models'

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

cities.route('/:id')
	.put(function (req, res) {
		City.findById(req.params.id, (err, city) => {
			if (err) {
				res.status(500).send(err);
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
		City.findByIdAndRemove(req.params.id, (err, city) => {
			if (err) {
				res.status(500).send(err);
			}
			let response = {
				message: "Todo successfully deleted",
				id: city._id
			};
			res.status(200).send(response);
		});
	});