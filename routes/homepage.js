import {Router} from 'express';
export const homePage = Router();

homePage.get('/', (req, res) => {
	res.status(200).json({
		"message": "Welcome to HOME"
	})
});
