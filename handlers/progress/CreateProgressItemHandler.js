const ProgressItemModel = require('@/models/ProgressItemModel');
const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/features/progress');
const handleApiError = require('@/utils/handleApiError');

const CreateProgressItemHandler = async (req, res) => {
	try {
		const body = req.body;
		const file = req.file;

		if (
			typeof body.name !== 'string' ||
			typeof body.description !== 'string' ||
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
		};

		if (body.author) data['author'] = body.author;
		if (body.labels) data['labels'] = body.labels;
		if (body.link) data['link'] = body.link;
		if (body.startedAt) data['startedAt'] = body.startedAt;
		if (body.finishedAt) data['finishedAt'] = body.finishedAt;
		// if (req.file) data['image'] = body.finishedAt;

		const progressItem = await ProgressItemModel.create(data);

		return res.status(201).json({ progressItem });
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = CreateProgressItemHandler;
