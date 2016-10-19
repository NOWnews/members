require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const http = require('http');

const web = require('../web/web.js');

const env = process.env.NODE_ENV;
const port = process.env.PORT || '7777';
web.set('port', port);

const server = http.createServer(web);
server.listen(port);
console.log(chalk.cyan(`-------------------------------`));
console.log(chalk.cyan(`Start NOWmembers 會員系統 Web`));
console.log(chalk.cyan(`Listen Port ${port}`));
console.log(chalk.cyan(`${env} mode`));
console.log(chalk.cyan(`-------------------------------`));
