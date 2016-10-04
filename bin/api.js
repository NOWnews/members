require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const http = require('http');

const api = require('../api/app.js');

const env = process.env.NODE_ENV;
const port = process.env.PORT || '8888';
api.set('port', port);

const server = http.createServer(api);
server.listen(port);
console.log(chalk.blue(`-------------------------------`));
console.log(chalk.blue(`Start NOWmembers 會員系統 API`));
console.log(chalk.blue(`Listen Port ${port}`));
console.log(chalk.blue(`${env} mode`));
console.log(chalk.blue(`-------------------------------`));