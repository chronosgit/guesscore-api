const express = require('express');
var cookieParser = require('cookie-parser');
require('dotenv').config();
require('module-alias/register');
const { upload } = require('@/lib/multer');
const authRouter = require('@/routers/authRouter');
const progressRouter = require('@/routers/progressRouter');
const ListenPortHandler = require('@/handlers/ListenPortHandler.js');
const MongooseConnectHandler = require('@/handlers/MongooseConnectHandler.js');
const handleApiError = require('@/utils/handleApiError');

const startServer = async () => {
	try {
		MongooseConnectHandler();
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);

		process.exit(-1);
	}

	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.listen(process.env.PORT, ListenPortHandler);

	app.use('/api/v1/auth', authRouter);

	app.use('/api/v1/progress', progressRouter);
};

startServer();
