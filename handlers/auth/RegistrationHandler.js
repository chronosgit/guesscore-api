const m = require('mongoose');
const UserModel = require('@/models/UserModel');
const handleApiError = require('@/utils/handleApiError');
const signToken = require('@/utils/signToken');

const RegistrationHandler = async (req, res) => {
	try {
		const body = req.body;

		if (
			typeof body?.username !== 'string' ||
			typeof body?.password !== 'string'
		) {
			return res.status(400).json(handleApiError({ status: 400 }));
		}

		const { username, password } = body;

		const userWithSuchUsername = await UserModel.findOne({ username });

		if (userWithSuchUsername != null) {
			return res.status(400).json(
				handleApiError({
					status: 400,
					message: 'Such user already exists',
				}),
			);
		}

		const user = await UserModel.create({
			username: username.trim(),
			password: password.trim(),
		});

		const accessToken = signToken({
			payload: { userId: user._id, username: user.username },
			time: '15m',
		});

		const refreshToken = signToken({
			payload: { userId: user._id, username: user.username },
			time: '7d',
		});

		return res
			.status(201)
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

module.exports = RegistrationHandler;
