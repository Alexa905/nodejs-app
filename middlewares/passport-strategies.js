const jwt = require('jsonwebtoken');
import {usersData} from "../data/users";
const passport = require('passport');
const PassportLocalStrategy = require('passport-local');
const PassportBearerStrategy = require('passport-http-bearer');



export const localStrategy = (res, req, next) => {
	passport.use(new PassportLocalStrategy({
		usernameField: 'firstName',
		passwordField: 'lastName',
		session: false
	}, (username, password, next) => {
		let user = usersData.find(({firstName}) => firstName === username);
		if (!user || user.lastName !== password) {
			next(null, false, 'User or password is invalid')
		} else {
			next(null, {user, token: jwt.sign(user, 'enigma', {expiresIn: 3600})})
		}
	}));

	passport.authenticate('local', {
		session: false,
		failureRedirect: '/api/auth/404'
	});
}


/*	let user = usersData.find(({firstName}) => firstName === req.body.firstName);
 if (!user || user.lastName !== req.body.lastName) {
 res.status(403).json({success: false, message: 'User or password is invalid'})
 } else {
 user.token = jwt.sign(user, 'enigma', {expiresIn: 3600});
 req.user = user;
 next()
 }*/


export const bearerStrategy = (req, res, next) => {

	passport.use(new PassportBearerStrategy((token, next) => {
		jwt.verify(token, 'enigma', (err, decoded) => err ? next(null) : next(null, decoded))
	}));
	passport.authenticate('bearer', {session: false, failureRedirect: '/api/auth/404'})
};