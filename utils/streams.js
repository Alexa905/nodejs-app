const minimist = require('minimist');
const fs = require('fs');
const through = require('through2');
const request = require('request');
const split = require('split');
const papa = require("papaparse");
const path = require("path");
const https = require('https');
const promisify = require('util').promisify;
const Readable = require('stream').Readable;
const pathToCssFile = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

let argv = process.argv;
let args = minimist(argv);

const printHelpMessage = () => {
	console.info('\n----Run script in command line with arguments "file"(path to file), "action"(method name to call, is required) or some other arguments required to your function. ' +
		'\n-----Methods to use: bundle-css, read-file, stdin-to-uppercase, transform-csv-to-json, transform-csv-to-json-to-file \n-');
};

const camelCase = string => {
	return string.replace(/-([a-z])/ig, function (all, letter) {
		return letter.toUpperCase();
	});
};

let transformPipe = through(function (chunk, enc, callback) {
	const parsedData = papa.parse(chunk.toString(), {delimiter: ',', header: true, skipEmptyLines: true}).data
	let data = parsedData.reduce((prev, cur, i) => {
		prev[i] = cur
		return prev;
	}, {});
	this.push(JSON.stringify(data));
	callback();
});

const init = () => {
	if (!argv[2] || argv[2] === '--help' && args.help) {
		printHelpMessage();
		process.exit();
	}
	if (!args.action) {
		console.error('Action argument is required!');
		process.exit();
	}
	let method = camelCase(args.action);
	if (utils[method]) {
		utils[method]()
	} else {
		printHelpMessage();
		process.exit();
	}

}

const utils = {
	readFile: () => {
		let reader = fs.createReadStream('diary.txt');
		reader.pipe(process.stdout)
	},
	stdinToUppercase: () => {
		process.stdin.setEncoding('utf8');

		process.stdin.on('readable', function () {
			var chunk = process.stdin.read();
			if (chunk !== null) {
				process.stdout.write('data: ' + chunk);
				process.stdin.end();
			}
		});

		process.stdin.on('end', function () {
			process.stdout.write('end');
		});

		/*		let transform = through(function (chunk, enc, callback) {

		 this.push(chunk.toString().toUpperCase());
		 callback();
		 });
		 process.stdout.write('Input string to be uppercase:  ');
		 process.stdin.pipe(transform).pipe(process.stdout).on('end', function() {  // this event will not trigger
		 process.exit()
		 });*/
	},
	transformCsvToJson: () => {
		let reader = fs.createReadStream('../data/data.csv');
		reader.pipe(transformPipe).pipe(process.stdout)
	},
	transformCsvToJsonToFile: () => {
		let reader = fs.createReadStream('../data/data.csv');
		let writer = fs.createWriteStream('../data/data.json');
		reader.pipe(transformPipe).pipe(writer);

	},
	cssBundler: async () => {
		const folderPath = args.path;

		if (folderPath) {
			const outputFile = `${folderPath}/bundle.css`;
			if (fs.existsSync(outputFile)) {
				fs.unlinkSync(outputFile);
			}

			const promisify = require('util').promisify;
			const urlToCssFile = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
			const write = fs.createWriteStream(outputFile);
			const cssBundle = await concatFiles(folderPath, 'css');

			const transformPipe = through(function (chunk, enc, callback) {
				this.push(cssBundle);
				this.push(chunk.toString());
				callback();
			});

			async function concatFiles(folderPath, extension = '.') {
				const files = await promisify(fs.readdir)(folderPath);
				return files.reduce((content, file) => {
					if (path.extname(file).includes(extension)) {
						content += String(fs.readFileSync(`${folderPath}/${file}`))
					}
					return content;
				}, '');
			}

			request(urlToCssFile).pipe(transformPipe).pipe(write);




		} else {
			console.log('Please provide the path to folder with *.css files as argument "path" to command line, e.g. --path ./css ')
		}
	}
};

init();


