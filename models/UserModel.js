const m = require('mongoose');
const UserSchema = require('schemas/UserSchema');

const UserModel = m.model('User', UserSchema);

module.exports = UserModel;
