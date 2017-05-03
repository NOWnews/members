'use strict';

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSmtpTransport = require('nodemailer-smtp-transport');

var _nodemailerSmtpTransport2 = _interopRequireDefault(_nodemailerSmtpTransport);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _randToken = require('rand-token');

var _randToken2 = _interopRequireDefault(_randToken);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _redis = require('../redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    genAuthToken: function genAuthToken(email) {
        var token = _randToken2.default.suid(16);
        var expireTime = (0, _momentTimezone2.default)().add(3, 'days').tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
        _redis2.default.setValue(token, email, 259200);
        return { token: token, expireTime: expireTime };
    },
    mailer: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
            var from, to, subject, html, transporter, mailInfo;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            from = options.from, to = options.to, subject = options.subject, html = options.html;
                            transporter = _nodemailer2.default.createTransport((0, _nodemailerSmtpTransport2.default)({
                                host: 'mail.nownews.com.tw',
                                port: 465,
                                secure: true,
                                auth: {
                                    user: 'member@mail.nownews.com.tw',
                                    pass: '5j18ru,4'
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            }));
                            mailInfo = {
                                from: from || '<member@mail.nownews.com.tw>',
                                to: to,
                                subject: subject || '很重要，請立刻通知我們',
                                html: html || '<h1>如果你收到這封信，這代表發生了很嚴重的錯誤，請馬上回報給我們。<h1>'
                            };
                            _context.next = 5;
                            return new _bluebird2.default(function (resolve, reject) {
                                transporter.sendMail(mailInfo, function (err, info) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    console.log(info);
                                    return resolve(info);
                                });
                            });

                        case 5:
                            return _context.abrupt('return', _context.sent);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function mailer(_x) {
            return _ref.apply(this, arguments);
        }

        return mailer;
    }()
};