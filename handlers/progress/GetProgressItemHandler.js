const { isValidObjectId } = require('mongoose');
const ProgressItemModel = require('@/models/ProgressItemModel');
const handleApiError = require('@/utils/handleApiError');

const GetProgressItemHandler = async (req, res) => {
	try {
		const id = req.params?.id;

		if (!isValidObjectId(id)) {
			return res.status(200).json({ progressItem: null });
		}

		const progressItem = await ProgressItemModel.findById(id);

		if (progressItem == null) {
			return res.status(200).json({ progressItem: null });
		}

		if (String(progressItem.userId) !== String(req.user?.userId)) {
			return res.status(403).json(handleApiError({ status: 403 }));
		}

		return res.status(200).json({ progressItem });
	} catch (err) {
		return res.status(500).json(handleApiError({ err }));
	}
};

module.exports = GetProgressItemHandler;
