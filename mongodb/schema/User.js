const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const userSchema = new Schema({
	firstName: String,
	lastName: String,
	password: String
});

