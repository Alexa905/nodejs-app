import {Router} from 'express';
export const users = Router();
import { usersData } from '../data/users';

users.get('/', (req, res) => {
	res.json(usersData)
});