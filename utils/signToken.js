const jwt = require('jsonwebtoken');

/**
 * @param {{payload: unknown, time: number | string}} data
 * @returns {string}
 */
const signToken = (data) => {
	const token = jwt.sign(data.payload, process.env.JWT_SECRET, {
		expiresIn: data.time,
	});

	return token;
};

module.exports = signToken;
