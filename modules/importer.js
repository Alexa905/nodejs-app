import emitter from '../eventEmitter.js'
import csv from 'csvtojson'
const csvPath = './data/data.csv'
const importCsv = async csvPath => {
	await csv().fromFile(csvPath)
		.on('json', data => {
			console.log('data');
			console.log(data);
		})
		.on("done", function (error) {
			if(error) throw error;
			console.log("done");
		});
}
class Importer {
	constructor() {
		emitter.on('dirchange', path => {
			console.log(`File ${path} is changed`)
			importCsv(csvPath);
		});
	}

	importAsync(csvPath){
		importCsv(csvPath);
	}
	importSync(csvPath){
		process.nextTick(() => {importCsv(csvPath)})
	}
}

export {Importer}