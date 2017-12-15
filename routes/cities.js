import {Router} from 'express';
export const cities = Router();
import db from "../models";
const User = db.user;

cities.get('/', (req, res) => {
	User.findAll().then(data => {
		res.json(data)
	});
});