const express = require('express');
const { upload } = require('@/lib/multer');
const authMiddleware = require('@/middlewares/authMiddleware');
const fileMiddleware = require('@/middlewares/fileMiddleware');
const CreateProgressItemHandler = require('@/handlers/progress/CreateProgressItemHandler');
const handleApiError = require('@/utils/handleApiError');

const progressRouter = express.Router();

const uploadMiddleware = (req, res, next) => {
	const handler = upload.single('image');

	handler(req, res, (err) => {
		if (err) {
			return res.status(400).json(
				handleApiError({
					err,
					status: 400,
					message: 'Invalid uploaded image',
				}),
			);
		}

		next();
	});
};

progressRouter.post(
	'/items',
	authMiddleware,
	uploadMiddleware,
	CreateProgressItemHandler,
);

module.exports = progressRouter;
