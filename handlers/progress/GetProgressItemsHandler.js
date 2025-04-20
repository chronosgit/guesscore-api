const ProgressItemModel = require('@/models/ProgressItemModel');
const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/progress');
const { perPage } = require('@/constants/pagination');
const handleApiError = require('@/utils/handleApiError');
const getPaginationMeta = require('@/utils/pagination/getPaginationMeta');
const getSkipNumber = require('@/utils/pagination/getSkipNumber');

const GetProgressItemsHandler = async (req, res) => {
	try {
		const q = req.query || {};

		const filter = {
			userId: req.user?.userId,
		};
		if (q.name) filter.name = { $regex: q.name, $options: 'i' };
		if (q.author) filter.author = { $regex: q.author, $options: 'i' };
		if (progressItemTypeEnum.includes(q.type)) filter.type = q.type;
		if (difficultyEnum.includes(q.difficulty)) filter.difficulty = q.difficulty;
		if (q.startedAt) filter.startedAt = { $gte: new Date(q.startedAt) };
		if (q.finishedAt) filter.finishedAt = { $lte: new Date(q.finishedAt) };

		const skipNumber = getSkipNumber({
			curPage: q.curPage,
		});

		const progressItems = await ProgressItemModel.find(filter)
			.sort(q.sort || 'startedAt')
			.skip(skipNumber)
			.limit(perPage);

		return res.status(200).json({
			meta: getPaginationMeta({
				items: progressItems,
				curPage: q.curPage,
				perPage,
			}),
			items: progressItems,
		});
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = GetProgressItemsHandler;
