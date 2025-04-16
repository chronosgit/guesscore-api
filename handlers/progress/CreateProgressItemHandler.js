const ProgressItemModel = require('@/models/ProgressItemModel');
const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/progress');
const handleApiError = require('@/utils/handleApiError');
const createImageObject = require('@/utils/createImageObject');

const CreateProgressItemHandler = async (req, res) => {
	try {
		const body = req.body;

		if (
			typeof body.name !== 'string' ||
			typeof body.description !== 'string' ||
			typeof body.startedAt !== 'string' ||
			typeof req.user?.userId !== 'string' ||
			!progressItemTypeEnum.includes(body.type) ||
			!difficultyEnum.includes(body.difficulty)
		) {
			return res.status(400).json(handleApiError({ status: 400 }));
		}

		const data = {
			userId: req.user.userId,
			name: body.name,
			description: body.description,
			type: body.type,
			difficulty: body.difficulty,
			startedAt: body.startedAt,
		};

		if (body.author) data['author'] = body.author;
		if (body.labels) data['labels'] = body.labels;
		if (body.link) data['link'] = body.link;
		if (body.finishedAt) data['finishedAt'] = body.finishedAt;
		if (req.file) data['image'] = createImageObject(req.file).path;

		const progressItem = await ProgressItemModel.create(data);

		return res.status(201).json({ ...progressItem._doc });
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = CreateProgressItemHandler;
