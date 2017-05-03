'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _libs = require('../libs');

var _redis = require('../redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var env = _config2.default.env;
var router = _express2.default.Router();

router.post('/signup', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
        var err, _req$body, name, email, password, member, data, newMember, authToken, html;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        req.checkBody('email', 'invalid email').isEmail().notEmpty();
                        req.checkBody('password', 'invalid password').chkPassword().notEmpty();
                        req.checkBody('name', 'invalid username').notEmpty();

                        err = req.validationErrors();

                        if (!err) {
                            _context.next = 7;
                            break;
                        }

                        throw new Error(err[0].msg);

                    case 7:
                        _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                        _context.next = 10;
                        return _models.Member.findByEmail(email);

                    case 10:
                        member = _context.sent;

                        if (!member) {
                            _context.next = 13;
                            break;
                        }

                        throw new Error(11004);

                    case 13:

                        // create new member
                        data = new _models.Member(req.body);
                        _context.next = 16;
                        return data.new();

                    case 16:
                        newMember = _context.sent;


                        // create auth token which expire time as 30 mins later at redis
                        authToken = (0, _libs.genAuthToken)(newMember.email);

                        newMember.token = authToken.token;

                        html = _nunjucks2.default.render('./mailTemplates/confirm.html', {
                            expireTime: authToken.expireTime,
                            verifiedLink: _config2.default[env].web.url + '/api/auth/active?token=' + authToken.token
                        });


                        (0, _libs.mailer)({
                            subject: '感謝您註冊 NOWnews 會員',
                            to: newMember.email,
                            html: html
                        });

                        return _context.abrupt('return', res.json(newMember));

                    case 24:
                        _context.prev = 24;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', next(_context.t0));

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 24]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

router.post('/signin', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res, next) {
        var err, _req$body2, email, password, member;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        req.checkBody('email', 'invalid email').notEmpty();
                        req.checkBody('password', 'invalid password').notEmpty();
                        err = req.validationErrors();

                        if (!err) {
                            _context2.next = 6;
                            break;
                        }

                        throw new Error(err[0].msg);

                    case 6:
                        _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                        _context2.next = 9;
                        return _models.Member.login(email, password);

                    case 9:
                        member = _context2.sent;

                        if (member) {
                            _context2.next = 12;
                            break;
                        }

                        throw new Error(10000);

                    case 12:
                        if (!(member.status !== "ACTIVED")) {
                            _context2.next = 14;
                            break;
                        }

                        throw new Error(10002);

                    case 14:
                        return _context2.abrupt('return', res.json(member));

                    case 17:
                        _context2.prev = 17;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', next(_context2.t0));

                    case 20:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 17]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

// thirdparty signup (e.g. Facebook Google..etc)
router.post('/thirdPartySignup', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res, next) {
        var err, email, member, data, newMember;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;

                        req.checkBody('thirdPartyId').notEmpty();
                        req.checkBody('provider').notEmpty();
                        err = req.validationErrors();

                        if (!err) {
                            _context3.next = 6;
                            break;
                        }

                        throw new Error();

                    case 6:
                        email = req.body.email;
                        _context3.next = 9;
                        return _models.Member.findByEmail(email);

                    case 9:
                        member = _context3.sent;

                        if (!member) {
                            _context3.next = 12;
                            break;
                        }

                        throw new Error();

                    case 12:
                        data = new _models.Member(req.body);
                        _context3.next = 15;
                        return data.new();

                    case 15:
                        newMember = _context3.sent;
                        return _context3.abrupt('return', res.json(newMember));

                    case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3['catch'](0);
                        return _context3.abrupt('return', next(_context3.t0));

                    case 22:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 19]]);
    }));

    return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}());

router.post('/thirdPartySignin', function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res, next) {
        var err, thirdPartyId, member;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        req.checkBody('thirdPartyId').notEmpty();
                        req.checkBody('provider').notEmpty();
                        err = req.validationErrors();

                        if (!err) {
                            _context4.next = 6;
                            break;
                        }

                        throw new Error();

                    case 6:
                        thirdPartyId = req.body.thirdPartyId;
                        member = _models.Member.findByThirdPartyId(thirdPartyId);

                        if (member) {
                            _context4.next = 10;
                            break;
                        }

                        throw new Error();

                    case 10:
                        return _context4.abrupt('return', res.json(member));

                    case 13:
                        _context4.prev = 13;
                        _context4.t0 = _context4['catch'](0);
                        return _context4.abrupt('return', next(_context4.t0));

                    case 16:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 13]]);
    }));

    return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}());

module.exports = router;