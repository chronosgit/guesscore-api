const { perPage } = require('@/constants/pagination');

/**
 * @param {number | undefined} curPage
 * @returns {number}
 */
const getSkipNumber = (curPage) => {
	if (curPage == null) return 0;

	return (curPage - 1) * perPage;
};

module.exports = getSkipNumber;
