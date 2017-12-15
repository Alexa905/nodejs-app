const cities = require('./data/cities');
const mongoose = require('mongoose');
import {cityShema, userSchema, productSchema} from './models'
import {usersData} from '../data/users';
import {Importer} from "../modules";
const csvPath = '../data/MOCK_DATA.csv';
const importer = new Importer();

mongoose.connect('mongodb://localhost/mydb', {useMongoClient: true});

const productData = importer.importSync(csvPath);

const Cities = mongoose.model('cities', cityShema);
const Users = mongoose.model('users', userSchema);
const Products = mongoose.model('products', productSchema);
Cities.collection.insertMany(cities);
Users.collection.insertMany(usersData);
Products.collection.insertMany(productData);