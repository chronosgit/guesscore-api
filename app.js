const express = require('express');
require('dotenv').config();

const ListenPortHandler = require('./handlers/ListenPortHandler.js');
const MongooseConnectHandler = require('./handlers/MongooseConnectHandler.js');

const startServer = async () => {
	try {
		await MongooseConnectHandler();
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);

		process.exit(-1);
	}

	const app = express();

	app.listen(process.env.PORT, ListenPortHandler);
};

startServer();
