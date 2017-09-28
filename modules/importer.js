import fs from "fs";
import papa from "papaparse";
import {promisify} from "util";
const csvPath = '../data/data.csv';

const csvToJson = content => {
	return papa.parse(content, {header: true}).data;
};

const importDataSync = (path = csvPath) => {
	try {
		const content = fs.readFileSync(path, 'utf8');
		return csvToJson(content);
	} catch (error) {
		throw error;
	}

};

export class Importer {
	constructor(emitter, eventName) {
		emitter.on(eventName, path => {
			console.log(`File ${path} is changed`)
			console.log(importDataSync(csvPath))
		});
	}

	importAsync(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', (err, data) => {
				if (err) {
					reject(err);
					throw err;
				}
				resolve(csvToJson(data));
			});
		});
	}

	importSync(path) {
		return importDataSync(path);
	}
}
