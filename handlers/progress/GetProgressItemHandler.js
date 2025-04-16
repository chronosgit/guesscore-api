const { isValidObjectId } = require('mongoose');
const ProgressItemModel = require('@/models/ProgressItemModel');
const handleApiError = require('@/utils/handleApiError');

const GetProgressItemHandler = async (req, res) => {
	try {
		const id = req.params?.id;

		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json(
					handleApiError({ status: 400, message: 'Invalid progress item ID' }),
				);
		}

		const progressItem = await ProgressItemModel.findById(id);

		if (progressItem == null) {
			return res.status(404).json(handleApiError({ status: 404 }));
		}

		return res.status(200).json(progressItem);
	} catch (err) {
		return res.status(500).handleApiError({ err });
	}
};

module.exports = GetProgressItemHandler;
