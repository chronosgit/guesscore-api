const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('module-alias/register');
const authRouter = require('@/routers/authRouter');
const progressRouter = require('@/routers/progressRouter');
const ListenPortHandler = require('@/handlers/ListenPortHandler.js');
const MongooseConnectHandler = require('@/handlers/MongooseConnectHandler.js');

const startServer = async () => {
	try {
		await MongooseConnectHandler();
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);

		process.exit(-1);
	}

	const allowedOrigins = ['http://localhost:5173'];

	const app = express();

	app.use(
		cors({
			origin: function (origin, callback) {
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			},
			credentials: true,
		}),
	);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	app.listen(process.env.PORT, ListenPortHandler);

	app.use('/api/v1/auth', authRouter);

	app.use('/api/v1/progress', progressRouter);

	app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
};

startServer();
