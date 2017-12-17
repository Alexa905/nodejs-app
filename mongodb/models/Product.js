const mongoose = require('mongoose');

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

productSchema.pre('save', function (next) {
	this.lastModifiedDate = new Date();
	next();
});

export const Product = mongoose.model('Product', productSchema);
