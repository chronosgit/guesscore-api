const m = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new m.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 32,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		maxlength: 32,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);

	next();
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = UserSchema;
