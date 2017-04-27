require('babel-core/register');
require('babel-polyfill');

import express from 'express';
let app = express();

const member = require('./controllers/member');
const authenticate = require('./controllers/authenticate');
// const controllers = require('./controllers');
const middlewares = require('./middlewares');
const errorHandlers = require('./errorHandlers');

// middlewares
app.use(middlewares(app));

// controllers
app.post('/api/member/signup', member.signup);
app.post('/api/member/signin', member.signin);
app.get('/api/auth/active', authenticate.active);
app.post('/api/auth/resend', authenticate.resendEmail);

// errorHandles
app.use(errorHandlers(app));

module.exports = app;