const { isValidObjectId } = require('mongoose');
const ProgressItemModel = require('@/models/ProgressItemModel');
const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/progress');
const handleApiError = require('@/utils/handleApiError');
const createImageObject = require('@/utils/createImageObject');
const deleteUploadedFile = require('@/utils/deleteUploadedFile');
const getFilenameFromUrl = require('@/utils/getFilenameFromUrl');

const UpdateProgressItemHandler = async (req, res) => {
	try {
		const id = req.params?.id;

		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json(
					handleApiError({ status: 400, message: 'Invalid progress item ID' }),
				);
		}

		const body = req.body;

		if (
			body.name == null ||
			body.description == null ||
			body.startedAt == null ||
			!progressItemTypeEnum.includes(body.type) ||
			!difficultyEnum.includes(body.difficulty)
		) {
			return res.status(400).json(handleApiError({ status: 400 }));
		}

		const data = {
			name: body.name,
			description: body.description,
			type: body.type,
			difficulty: body.difficulty,
			startedAt: body.startedAt,
			author: body.author,
			labels: body.labels,
			link: body.link,
			finishedAt: body.finishedAt,
			image: req.file ? createImageObject(req.file).path : null,
		};

		const progressItem = await ProgressItemModel.findById(id);

		if (progressItem == null) {
			return res.status(404).json(handleApiError({ status: 404 }));
		}

		if (progressItem.image) {
			deleteUploadedFile(getFilenameFromUrl(progressItem.image));
		}

		Object.assign(progressItem, data);
		await progressItem.save();

		return res.status(200).json({ progressItem });
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = UpdateProgressItemHandler;
