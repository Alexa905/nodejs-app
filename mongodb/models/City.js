const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cityShema = new Schema({
	id: String,
	city: String,
	growth_from_2000_to_2013: String,
	population: String,
	capital: String,
	rank: String,
	state: String,
	latitude: Number,
	longitude: Number,
	lastModifiedDate: String
});

cityShema.pre('save', function (next) {
	this.lastModifiedDate = new Date();
	next();
});

export const City = mongoose.model('City', cityShema);
