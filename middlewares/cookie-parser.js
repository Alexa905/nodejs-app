const parser = require('cookie-parser');
export const cookieParser = (req, res, next) => {
	if(req.headers.cookie){
		req.parsedCookies = parser.JSONCookies(req.headers.cookie);
	}
	next();
};
