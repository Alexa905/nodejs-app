const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = mongoose.createConnection('mongodb://localhost/develop_db', {useMongoClient: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("mongodb connected!");
});

export default db;