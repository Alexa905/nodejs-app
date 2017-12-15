const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const cityShema = new Schema({
	city: String,
	growth_from_2000_to_2013: String,
	population: String,
	rank: String,
	state: String,
	latitude: Number,
	longitude: Number
})

