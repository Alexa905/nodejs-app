const http = require('http');

http
	.createServer((req, res) => {
		console.log("Connection from " + req.headers.host);
		res.writeHead(200);
		req.pipe(res);
	})
	.on('error', err => console.log(err))
	.listen('3000', () => {
		console.log(`Server is running`)
	});