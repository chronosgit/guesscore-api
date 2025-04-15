const jwt = require('jsonwebtoken');
const error401 = require('@/errors/error401');
const errorInvalidToken = require('@/errors/errorInvalidToken');

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json(error401);
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		req.user = payload;

		next();
	} catch (err) {
		console.log(err);

		return res.status(401).json(errorInvalidToken);
	}
};

module.exports = authMiddleware;
