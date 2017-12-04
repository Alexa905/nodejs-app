const jwt = require('jsonwebtoken');
import { usersData } from '../data/users';

export const checkLogin = (req, res, next) => {
	let user = usersData.find(({firstName}) => firstName === req.body.firstName);
	if (!user || user.lastName !== req.body.lastName) {
		res.status(403).json({success: false, message: 'User or password is invalid'})
	} else {
		user.token = jwt.sign(user, 'enigma', {expiresIn: 3600})
		req.user = user;
		next()
	}
};