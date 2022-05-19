module.exports = function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
	Object.keys(req?.body).length && console.log(req.body);
	next();
};
