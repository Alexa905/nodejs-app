import {Router} from 'express';
export const users = Router();
import db from "../mongodb";
const User = db.model('User');

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
		User.findByIdAndRemove(req.params.id, (err, {id}) => {
			if (err) {
				res.status(500).send(err);
			}
			res.status(200).send(`User #${id} successfully deleted`);
		});
	});