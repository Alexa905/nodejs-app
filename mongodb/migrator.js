const cities = require('../data/cities');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//import {City, User, Product} from './models'
import {usersData} from '../data/users';
import {Importer} from "../modules";
const csvPath = '../data/MOCK_DATA.csv';
const importer = new Importer();

const db = mongoose.connect('mongodb://localhost/develop_db', {useMongoClient: true});


const Schema = mongoose.Schema;

const productSchema = new Schema({
	id: String,
	name: String,
	brand: String,
	company: String,
	price: String,
	isbn: String,
	lastModifiedDate: String
})


const Product = mongoose.model('products', productSchema);

const productData = importer.importSync(csvPath);

//City.collection.insertMany(cities);
//User.collection.insertMany(usersData);
console.log(db)
try {
	Product.collection.insertMany( [
		{ item: "card", qty: 15 },
		{ item: "envelope", qty: 20 },
		{ item: "stamps" , qty: 30 }
	] );
} catch (e) {
	console.log(e);
}


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("mongodb connected!");
});
db.close();