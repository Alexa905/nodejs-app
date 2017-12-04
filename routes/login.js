import {Router} from 'express';
export const login = Router();

login.post('/', (req, res) => {
	res.status(200).json({
		"code": 200,
		"message": "OK",
		"data": {
			"user": req.user
		}
	});
});