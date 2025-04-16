/**
 *
 * @param {string} url
 * @returns {string}
 */
const getFilenameFromUrl = (url) => {
	return url.split('/').pop();
};

module.exports = getFilenameFromUrl;
