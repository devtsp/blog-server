module.exports = function logger(req, res, next) {
	console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
	if (Object.keys(req.params).length)
		console.log(`Params: ${JSON.stringify(req.params)}`);
	if (req.body) console.log(`Body: ${JSON.stringify(req.body)}`);
	next();
};
