const error400 = require('errors/error400');
const error401 = require('errors/error401');
const error403 = require('errors/error403');
const error500 = require('errors/error500');
const errorInvalidToken = require('errors/errorInvalidToken');

/**
 * @param {Error} err
 * @param {'400' | '401' | '403' | 'TOKEN_INVALID' | undefined} status
 */
const handleApiError = (err, status) => {
	console.error(err);

	if (status == null) return error500;

	switch (status) {
		case '400':
			return error400;
		case '401':
			return error401;
		case '403':
			return error403;
		case '500':
			return error500;
		case 'TOKEN_INVALID':
			return errorInvalidToken;
		default:
			return error500;
	}
};

module.exports = handleApiError;
