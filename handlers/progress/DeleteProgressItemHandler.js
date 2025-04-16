const { isValidObjectId } = require('mongoose');
const ProgressItemModel = require('@/models/ProgressItemModel');
const handleApiError = require('@/utils/handleApiError');
const deleteUploadedFile = require('@/utils/deleteUploadedFile');
const getFilenameFromUrl = require('@/utils/getFilenameFromUrl');

const DeleteProgressItemHandler = async (req, res) => {
	try {
		const id = req.params?.id;

		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json(
					handleApiError({ status: 400, message: 'Invalid progress item ID' }),
				);
		}

		const progressItem = await ProgressItemModel.findById({ _id: id });

		if (progressItem == null) {
			return res.status(404).json(handleApiError({ status: 404 }));
		}

		if (String(progressItem.userId) !== String(req.user?.userId)) {
			return res.status(403).json(handleApiError({ status: 403 }));
		}

		deleteUploadedFile(getFilenameFromUrl(progressItem.image));

		await progressItem.deleteOne();

		return res.sendStatus(204);
	} catch (err) {
		return res.status(500).handleApiError({ err });
	}
};

module.exports = DeleteProgressItemHandler;
