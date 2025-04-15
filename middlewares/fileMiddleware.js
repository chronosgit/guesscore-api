const fileMiddleware = (req, res, next) => {
	console.log(req);

	next();
};

module.exports = fileMiddleware;
