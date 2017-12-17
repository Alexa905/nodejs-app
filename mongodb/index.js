const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import * as models from './models';

const db = mongoose.createConnection('mongodb://localhost/develop_db', {useMongoClient: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("mongodb connected!");
});
Object.keys(models).forEach(model => db.model[model] = model);

export default db;