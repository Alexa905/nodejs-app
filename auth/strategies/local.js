import {usersData} from "../../data/users";
const Strategy = require('passport-local');
const jwt = require('jsonwebtoken');

export const localStrategy = new Strategy({
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
});

export const serialize = (user, next) => next(null, user.id);

export const deserialize = (id, next) => {
	let user = usersData.find(user => user.id === id);
	if (user) {
		next(null, user);
	} else {
		next(false);
	}
}
