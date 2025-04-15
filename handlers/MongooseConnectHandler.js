const m = require('mongoose');

const MongooseConnectHandler = () => {
	return m.connect(process.env.MONGODB_CONNECTION_STRING);
};

module.exports = MongooseConnectHandler;
