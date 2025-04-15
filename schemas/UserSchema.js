const m = require('mongoose');

const UserSchema = new m.Schema({
	username: {
		type: String,
		unique: String,
		required: String,
		trim: String,
		minlength: 1,
		maxlength: 32,
	},
	password: {
		type: String,
		required: String,
		minlength: 1,
		maxlength: 32,
	},
});

module.exports = UserSchema;
