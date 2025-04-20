const jwt = require('jsonwebtoken');
const handleApiError = require('@/utils/handleApiError');
const signToken = require('@/utils/signToken');

const RefreshTokensHandler = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json(
				handleApiError({
					status: 401,
					message: 'No refresh token was provided',
				}),
			);
		}

		jwt.verify(refreshToken, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				return res.status(403).json(
					handleApiError({
						status: 403,
						message: 'Invalid refresh token',
					}),
				);
			}

			const accessToken = signToken({
				payload: { userId: payload.userId, username: payload.username },
				time: '15m',
			});

			return res.status(200).json({ accessToken, username: payload.username });
		});
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = RefreshTokensHandler;
