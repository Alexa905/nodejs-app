const http = require('http');
const fs = require('fs');
const filePath = __dirname + '/index.html';
const message = 'Hello from the server2';
const through2 = require('through2');

http
	.createServer((req, res) => {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});
		fs.createReadStream(filePath, 'utf8').pipe(through2({objectMode: true}, function (chunk) {
			this.push(chunk.replace(/{message}/, message))
		})).pipe(res);
	})
	.on('error', err => console.log(err))
	.listen('3000', () => {
		console.log(`Server is running`)
	});