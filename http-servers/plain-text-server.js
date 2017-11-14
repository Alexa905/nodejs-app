const http = require('http')

http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-type': 'text/plain'
	});
	res.end('HELLO, WORLD!');
})
	.on('error', err => console.log(err))
	.listen('3000', ()=>{
		console.log(`Server is running`)
	});