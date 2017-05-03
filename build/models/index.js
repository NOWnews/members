'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config')['' + process.env.NODE_ENV];

console.log(config);

/*
 * 利用 bluebird 將 mongoose 轉換成可以使用 promise
 */
_bluebird2.default.promisifyAll(_mongoose2.default);
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.set('debug', true);
_mongoose2.default.connectAsync(config.mongodb.host + '/' + config.mongodb.db);
var connection = _mongoose2.default.connection;
console.log(_chalk2.default.blue('mongodb connect to: ' + config.mongodb.host + '/' + config.mongodb.db));

_mongooseAutoIncrement2.default.initialize(connection);

module.exports = {
  Member: require('./member')
};