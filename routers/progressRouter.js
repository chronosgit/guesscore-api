const express = require('express');
const { upload } = require('@/lib/multer');
const authMiddleware = require('@/middlewares/authMiddleware');
const CreateProgressItemHandler = require('@/handlers/progress/CreateProgressItemHandler');
const GetProgressItemsHandler = require('@/handlers/progress/GetProgressItemsHandler');
const GetProgressItemHandler = require('@/handlers/progress/GetProgressItemHandler');
const DeleteProgressItemHandler = require('@/handlers/progress/DeleteProgressItemHandler');
const UpdateProgressItemHandler = require('@/handlers/progress/UpdateProgressItemHandler');
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

progressRouter.get('/items', authMiddleware, GetProgressItemsHandler);

progressRouter.get('/items/:id', authMiddleware, GetProgressItemHandler);

progressRouter.post(
	'/items',
	authMiddleware,
	uploadMiddleware,
	CreateProgressItemHandler,
);

progressRouter.put(
	'/items/:id',
	authMiddleware,
	uploadMiddleware,
	UpdateProgressItemHandler,
);

progressRouter.delete('/items/:id', authMiddleware, DeleteProgressItemHandler);

module.exports = progressRouter;
