import {Router} from 'express';
export const users = Router();
import db from "../models";
const User = db.user;

users.get('/', (req, res) => {
	User.findAll().then(data => {
		res.json(data)
	});
});