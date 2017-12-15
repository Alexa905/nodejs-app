import {Router} from 'express';
export const users = Router();
/*import db from "../models";
 const User = db.user;*/

import {User} from '../mongodb/models'

users.get('/', (req, res) => {
	User.find({}, (err, data) => {
		if (err) {
			console.log(err);
			res.statusCode(404);
		}
		res.json(data)
	});
});
users.route('/:id')
	.delete(function (req, res) {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			if (err) {
				res.status(500).send(err);
			}
			let response = {
				message: "Todo successfully deleted",
				id: user._id
			};
			res.status(200).send(response);
		});
	});