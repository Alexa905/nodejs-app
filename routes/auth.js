import {Router} from "express";
import {verifyToken, checkLogin} from "../middlewares";
export const auth = Router();

auth.get('/', verifyToken, (req, res) => {
	res.status(200).json(req.user)
});

auth.post('/', checkLogin, (req, res) => {
	res.status(200).json({
		"code": 200,
		"message": "OK",
		"data": {
			"user": req.user
		}
	});
});