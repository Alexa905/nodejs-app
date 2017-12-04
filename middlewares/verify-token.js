const jwt = require('jsonwebtoken');
export const verifyToken = (req, res, next) => {
	let authorization = req.headers['authorization'];
	if (authorization) {
		let token = authorization.split(' ')[1]
		jwt.verify(token, 'enigma', (err, decoded) => {
			if (err) {
				res.json({success: false, massage: 'Failed to authenticate token'})
			} else {
				req.user = decoded;
				next();
			}
		})
	} else {
		res.status(403).json({success: false, message: 'No token'})
	}
};
