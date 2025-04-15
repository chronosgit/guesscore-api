const express = require('express');
require('dotenv').config();
require('module-alias/register');
const authRouter = require('@/routers/authRouter');
const ListenPortHandler = require('@/handlers/ListenPortHandler.js');
const MongooseConnectHandler = require('@/handlers/MongooseConnectHandler.js');

const startServer = async () => {
	try {
		await MongooseConnectHandler();
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);

		process.exit(-1);
	}

	const app = express();

	app.listen(process.env.PORT, ListenPortHandler);

	app.use('/api/v1/auth', authRouter);
};

startServer();
