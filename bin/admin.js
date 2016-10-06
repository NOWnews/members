require('babel-core/register');
require('babel-polyfill');

const chalk = require('chalk');
const http = require('http');

const admin = require('../admin/admin.js');

const env = process.env.NODE_ENV;
const port = process.env.PORT || '9999';
admin.set('port', port);

const server = http.createServer(admin);
server.listen(port);
console.log(chalk.blue(`-------------------------------`));
console.log(chalk.blue(`Start NOWmembers 會員系統後台 ADMIN`));
console.log(chalk.blue(`Listen Port ${port}`));
console.log(chalk.blue(`${env} mode`));
console.log(chalk.blue(`-------------------------------`));