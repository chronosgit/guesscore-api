const error400 = require('@/errors/error400');
const error401 = require('@/errors/error401');
const error403 = require('@/errors/error403');
const error404 = require('@/errors/error404');
const error500 = require('@/errors/error500');
const errorInvalidToken = require('@/errors/errorInvalidToken');

/**
 * @param {{
 * 	status: 400 | 401 | 403 | 404 | 500 | 'TOKEN_INVALID' | undefined,
 * 	err: Error | undefined,
 * 	message: string | undefined
 * }} data
 * @return {{status: number, message: string }}
 */
const handleApiError = (data) => {
	if (data.err) console.error(data.err);

	if (data.message) {
		return {
			status: data.status ?? 500,
			message: data.message,
		};
	}

	switch (data.status) {
		case 400:
			return error400;
		case 401:
			return error401;
		case 403:
			return error403;
		case 404:
			return error404;
		case 500:
			return error500;
		case 'TOKEN_INVALID':
			return errorInvalidToken;
		default:
			return error500;
	}
};

module.exports = handleApiError;
