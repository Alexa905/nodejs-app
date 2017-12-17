const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	id: String,
	firstName: String,
	lastName: String,
	password: String,
	lastModifiedDate: String
});

userSchema.pre('save', function (next) {
	this.lastModifiedDate = new Date();
	next();
});

export const User = mongoose.model('User', userSchema);