const http = require('http');
const fs = require('fs');
const product = {
	id: 1,
	name: 'Supreme T-Shirt',
	brand: 'Supreme',
	price: 99.99,
	options: [
		{color: 'blue'},
		{size: 'XL'}
	]
};

http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-type': 'application/json'
	});
	res.end(JSON.stringify(product))
})
	.on('error', err => console.log(err))
	.listen('3000', () => {
		console.log(`Server is running`)
	});