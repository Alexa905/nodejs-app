const parser = require('cookie-parser');
export const cookieParser = (req, res, next) => {
	req.parsedCookies = parser.JSONCookies(req.headers.cookie);
	next();
};
