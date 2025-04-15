const express = require('express');
const RegistrationHandler = require('handlers/auth/RegistrationHandler');

const authRouter = express.Router();

authRouter.post('/register', RegistrationHandler);

module.exports = authRouter;
