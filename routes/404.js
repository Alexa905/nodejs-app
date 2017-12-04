import {Router} from 'express';
export const errorPage = Router();

errorPage.get('/', (req, res) => {
	res.status(404).json({
		"code": 404,
		"message": "authentication failed"
	})
});