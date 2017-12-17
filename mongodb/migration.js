const cities = require('../data/cities');
import {usersData} from "../data/users";
import {Importer} from "../modules";
import db from "../mongodb";
const csvPath = '../data/MOCK_DATA.csv';
const importer = new Importer();

const productData = importer.importSync(csvPath);

try {
	db.model('City').collection.insertMany(cities);
	db.model('User').collection.insertMany(usersData);
	db.model('Product').collection.insertMany(productData);
	console.log('New collections were created');
} catch (e) {
	console.log(e);
}

