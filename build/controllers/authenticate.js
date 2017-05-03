'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _libs = require('../libs');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _redis = require('../redis');

var _redis2 = _interopRequireDefault(_redis);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var env = _config2.default.env;
var router = _express2.default.Router();

router.get('/active', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var err, token, value, isSuccess;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        req.checkQuery('token', 'invalid token').notEmpty();
                        err = req.validationErrors();

                        if (!err) {
                            _context.next = 5;
                            break;
                        }

                        throw new Error(err[0].msg);

                    case 5:
                        token = req.query.token;
                        // search member's auth token and email from redis

                        _context.next = 8;
                        return _redis2.default.getValue(token);

                    case 8:
                        value = _context.sent;

                        if (value) {
                            _context.next = 11;
                            break;
                        }

                        throw new Error();

                    case 11:
                        _context.next = 13;
                        return _models.Member.active(value);

                    case 13:
                        isSuccess = _context.sent;

                        if (isSuccess) {
                            _context.next = 16;
                            break;
                        }

                        throw new Error('account active fail');

                    case 16:

                        _redis2.default.removeValue(token);

                        return _context.abrupt('return', res.status(200).end());

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', next(_context.t0));

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 20]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

router.post('/resend', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        var err, email, member, authToken, html;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        req.checkBody('email', 'invalid email').notEmpty();
                        err = req.validationErrors();

                        if (!err) {
                            _context2.next = 5;
                            break;
                        }

                        throw new Error(err[0].msg);

                    case 5:
                        email = req.body.email;
                        _context2.next = 8;
                        return _models.Member.findByEmail(email);

                    case 8:
                        member = _context2.sent;

                        if (member) {
                            _context2.next = 11;
                            break;
                        }

                        throw new Error(11003);

                    case 11:
                        if (!(member.status !== 'PENDING')) {
                            _context2.next = 13;
                            break;
                        }

                        throw new Error(11005);

                    case 13:
                        _context2.next = 15;
                        return (0, _libs.genAuthToken)();

                    case 15:
                        authToken = _context2.sent;
                        html = _nunjucks2.default.render('./mailTemplates/resetVerify.html', {
                            expireTime: authToken.expireTime,
                            verifiedLink: _config2.default[env].web.url + '/api/auth/active?token=' + authToken.token
                        });


                        (0, _libs.mailer)({
                            subject: '重新驗證您的 NOWnews 帳戶',
                            to: member.email,
                            html: html
                        });

                        return _context2.abrupt('return', res.json(member));

                    case 21:
                        _context2.prev = 21;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', next(_context2.t0));

                    case 24:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 21]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

module.exports = router;