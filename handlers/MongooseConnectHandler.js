const m = require('mongoose');

const MongooseConnectHandler = async () => {
	await m.connect(process.env.MONGODB_CONNECTION_STRING);
};

module.exports = MongooseConnectHandler;
