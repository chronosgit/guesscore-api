/**
 * @param {{
 * 	items: Array,
 * 	curPage: number | undefined,
 * 	perPage: number | undefined
 * }} data
 * @returns {{
 * 	totalItems: number,
 * 	curPage: number | null,
 * 	maxPage: number,
 * 	hasNextPage: boolean,
 * 	hasPrevPage: boolean
 * }}
 */
const getPaginationMeta = (data) => {
	const maxPage = Math.ceil(
		data.items.length / (data.perPage ?? defaultPerPage),
	);

	const hasNextPage = data.curPage < maxPage;
	const hasPrevPage = 1 < data.curPage;

	return {
		totalItems: data.items.length,
		curPage: data.curPage,
		maxPage,
		hasNextPage,
		hasPrevPage,
	};
};

module.exports = getPaginationMeta;
