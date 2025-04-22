/**
 *
 * @param {string} url
 * @returns {string}
 */
const getFilenameFromUrl = (url) => {
	if (!url) return '';

	return url.split('/').pop();
};

module.exports = getFilenameFromUrl;
