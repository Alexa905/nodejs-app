import fs from "fs";
import pathModule from "path";
import papa from "papaparse";

const csvToJson = content => {
	return papa.parse(content, {header: true}).data;
};

const importDataSync = path => {
	try {
		const content = fs.readFileSync(pathModule.resolve(__dirname, path), 'utf8');
		return csvToJson(content);
	} catch (error) {
		throw error;
	}

};

export class Importer {
	constructor(emitter, eventName) {
		if(emitter) {
			emitter.on(eventName, (fileName, dirName) => {
				const filePath = path.resolve(dirName, fileName);
				console.log(`File ${fileName} is changed`);
				console.log(importDataSync(filePath));
			});
		}
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
