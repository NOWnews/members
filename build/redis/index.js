'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

var host = _config2.default.dev.redis.host;
var port = _config2.default.dev.redis.port;
var db = _config2.default.dev.redis.db;

var client = _redis2.default.createClient({
    host: host,
    port: port,
    db: db
});

module.exports = {
    getValue: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key) {
            var value, valueObject;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return client.getAsync(key);

                        case 3:
                            value = _context.sent;

                            console.log('value = %j', value);

                            if (value) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt('return', _bluebird2.default.resolve(null));

                        case 7:
                            valueObject = JSON.parse(value);
                            return _context.abrupt('return', _bluebird2.default.resolve(valueObject));

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', _bluebird2.default.reject(_context.t0));

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 11]]);
        }));

        function getValue(_x) {
            return _ref.apply(this, arguments);
        }

        return getValue;
    }(),
    setValue: function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(key, value, expireTime) {
            var valueString;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            valueString = JSON.stringify(value);
                            _context2.next = 4;
                            return client.setAsync(key, valueString);

                        case 4:
                            if (!expireTime) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 7;
                            return client.expireAsync(key, expireTime);

                        case 7:
                            return _context2.abrupt('return', _bluebird2.default.resolve(value));

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](0);
                            return _context2.abrupt('return', _bluebird2.default.reject(_context2.t0));

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 10]]);
        }));

        function setValue(_x2, _x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return setValue;
    }(),
    removeValue: function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(key) {
            var value;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return client.getAsync(key);

                        case 3:
                            value = _context3.sent;

                            console.log('value = %s', value);

                            if (value) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt('return', _bluebird2.default.resolve(true));

                        case 7:
                            _context3.next = 9;
                            return client.delAsync(key);

                        case 9:
                            return _context3.abrupt('return', _bluebird2.default.resolve(true));

                        case 12:
                            _context3.prev = 12;
                            _context3.t0 = _context3['catch'](0);
                            return _context3.abrupt('return', _bluebird2.default.reject(_context3.t0));

                        case 15:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined, [[0, 12]]);
        }));

        function removeValue(_x5) {
            return _ref3.apply(this, arguments);
        }

        return removeValue;
    }()
};