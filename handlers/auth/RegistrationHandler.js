const m = require('mongoose');
const handleApiError = require('@/utils/handleApiError');

const RegistrationHandler = async (req, res) => {
	try {
		const body = req.body;

		if (!body || !body.username || !body.password) {
			return res.status(400).json(handleApiError(err, '400'));
		}

		return res.status(201).json({ ...body });
	} catch (err) {
		return res.status(500).json(handleApiError(err));
	}
};

module.exports = RegistrationHandler;
