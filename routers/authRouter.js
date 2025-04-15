const express = require('express');
const LoginHandler = require('@/handlers/auth/LoginHandler');
const RegistrationHandler = require('@/handlers/auth/RegistrationHandler');
const RefreshTokensHandler = require('@/handlers/auth/RefreshTokensHandler');

const authRouter = express.Router();

authRouter.post('/login', LoginHandler);

authRouter.post('/register', RegistrationHandler);

authRouter.get('/refresh', RefreshTokensHandler);

module.exports = authRouter;
