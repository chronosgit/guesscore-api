const handleApiError = require('@/utils/handleApiError');

const LogoutHandler = async (_, res) => {
	try {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/api/v1/auth/refresh',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		return res.sendStatus(200);
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = LogoutHandler;
