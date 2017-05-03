'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register');
require('babel-polyfill');

var app = (0, _express2.default)();

var controllers = require('./controllers');
var middlewares = require('./middlewares');
var errorHandlers = require('./errorHandlers');

// middlewares
app.use(middlewares(app));

// controllers
app.use(controllers(app));

// errorHandles
app.use(errorHandlers(app));

module.exports = app;