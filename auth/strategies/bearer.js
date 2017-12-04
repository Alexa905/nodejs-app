const Strategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');

export const bearerStrategy = new Strategy((token, next) => {
	jwt.verify(token, 'enigma', (err, decoded) => err ? next(null) : next(null, decoded))
});