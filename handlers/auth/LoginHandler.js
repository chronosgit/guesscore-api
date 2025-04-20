const bcrypt = require('bcryptjs');
const UserModel = require('@/models/UserModel');
const handleApiError = require('@/utils/handleApiError');
const signToken = require('@/utils/signToken');

const LoginHandler = async (req, res) => {
	try {
		const body = req.body;

		if (
			typeof body?.username !== 'string' ||
			typeof body?.password !== 'string'
		) {
			return res.status(400).json(handleApiError({ status: 400 }));
		}

		const { username, password } = body;

		const userWithSuchUsername = await UserModel.findOne({
			username: username.trim(),
		});

		if (userWithSuchUsername == null) {
			return res.status(404).json(
				handleApiError({
					status: 404,
					message: "Such user doesn't exist",
				}),
			);
		}

		const isMatch = await bcrypt.compare(
			password,
			userWithSuchUsername.password.trim(),
		);

		if (!isMatch) {
			return res
				.status(400)
				.json(handleApiError({ status: 400, message: 'Invalid password' }));
		}

		const accessToken = signToken({
			payload: {
				userId: userWithSuchUsername._id,
				username: userWithSuchUsername.username,
			},
			time: '15min',
		});

		const refreshToken = signToken({
			payload: {
				userId: userWithSuchUsername._id,
				username: userWithSuchUsername.username,
			},
			time: '7d',
		});

		return res
			.status(200)
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/api/v1/auth/refresh',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			})
			.json({ accessToken });
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = LoginHandler;
