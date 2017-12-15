const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const productSchema = new Schema({
	name: String,
	brand: String,
	company: String,
	price: String,
	isbn: String
})
