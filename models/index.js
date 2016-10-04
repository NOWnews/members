import Promise from 'bluebird';
import mongoose from 'mongoose';
import chalk from 'chalk';

const config = require('../config')[`${process.env.NODE_ENV}`];

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);

mongoose.connectAsync(`${config.mongodb.host}/${config.mongodb.db}`);
const connection = mongoose.connection;
console.log(chalk.blue(`mongodb connect to: ${config.mongodb.host}/${config.mongodb.db}`));

import member from './member';

module.exports = {
    Member: member
};