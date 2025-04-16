const fs = require('fs');
const path = require('path');

/**
 * @param {string | undefined} fileName
 * @returns {void}
 */
const deleteUploadedFile = (fileName) => {
	if (!fileName) return;

	const filePath = path.join(process.cwd(), 'uploads', fileName);

	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Failed to delete file:', err);
		}
	});
};

module.exports = deleteUploadedFile;
