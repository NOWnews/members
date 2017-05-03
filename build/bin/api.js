'use strict';

require('babel-core/register');
require('babel-polyfill');

var chalk = require('chalk');
var http = require('http');

var api = require('../app.js');

var env = process.env.NODE_ENV;
var port = process.env.PORT || '8888';
api.set('port', port);

var server = http.createServer(api);
server.listen(port);
console.log(chalk.blue('-------------------------------'));
console.log(chalk.blue('Start NOWmembers \u6703\u54E1\u7CFB\u7D71 API'));
console.log(chalk.blue('Listen Port ' + port));
console.log(chalk.blue(env + ' mode'));
console.log(chalk.blue('-------------------------------'));