/**
 *
 * @param {{
 * 	fieldname: string,
 * 	originalname: string,
 * 	encoding: string,
 * 	mimetype: string,
 * 	destination: string,
 * 	filename: string,
 * 	path: string,
 * 	size: number
 * }} imageFile
 * @returns {{
 * 	name: string,
 * 	mimetype: string,
 * 	path: string
 * }}
 */
const createImageObject = (imageFile) => {
	const path = `${process.env.ADDRESS_SERVER}/uploads/${imageFile.filename}`;

	return {
		name: imageFile.filename,
		mimetype: imageFile.mimetype,
		path,
	};
};

module.exports = createImageObject;
