import Promise from 'bluebird';
import mongoose from 'mongoose';
import chalk from 'chalk';
import autoIncrement from 'mongoose-auto-increment';

const config = require('../config')[`${process.env.NODE_ENV}`];

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;
mongoose.connectAsync(`${config.mongodb.host}/${config.mongodb.db}`);
const connection = mongoose.connection;
console.log(chalk.blue(`mongodb connect to: ${config.mongodb.host}/${config.mongodb.db}`));

autoIncrement.initialize(connection);

module.exports = {
    Member: require('./member'),
    Verify: require('./verify'),
    ResetPassword: require('./resetPassword'),
    Service: require('./service')
};