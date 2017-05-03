'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../../models');

var _errCode = require('../../errorHandlers/errCode');

var _errCode2 = _interopRequireDefault(_errCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register');
require('babel-polyfill');

var config = require('../../config')['' + process.env.NODE_ENV];
var initDataPath = './test/config/initdata.json';

var should = _chai2.default.should();
var expect = _chai2.default.expect;

var host = process.env.HOST || 'localhost';
var port = process.env.PORT || '8888';

var url = host + ':' + port;
var server = null;

var initData = _jsonfile2.default.readFileSync(initDataPath, function (err, obj) {
    return obj;
});

var member = initData.member,
    new_member = initData.new_member,
    fake_member = initData.fake_member;


describe('Member APIs', function () {
    // dirty code, need to refactoring
    var token = null;
    before('Setup', function (done) {
        _app2.default.set('port', port);
        server = _http2.default.createServer(_app2.default);
        server.listen(port);
        _models.Member.remove({}, function (err) {
            if (err) throw err;
            _superagent2.default.post(url + '/api/member/signup').send(member).end(function (err, res) {
                token = res.body.token;
                console.log('initialize');
                done();
            });
        });
    });

    after('Clean', function (done) {
        _models.Member.remove({}, function (err) {
            if (err) throw err;
            console.log('Finished.');
            server.close();
            done();
        });
    });

    describe('#Member signup', function () {
        var endPoint = url + '/api/member/signup';

        it('should signup fail with exist account', function (done) {
            _superagent2.default.post(endPoint).send(member).end(function (err, res) {
                should.exist(err);
                done();
            });
        });

        it('should signup success with not exist account', function (done) {
            _superagent2.default.post(endPoint).send(new_member).end(function (err, res) {
                should.not.exist(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('email');
                done();
            });
        });
    });

    describe('#Resend active account email', function () {
        var endPoint = url + '/api/auth/resend';

        it('should resend email fail with not exist account', function (done) {
            _superagent2.default.post(endPoint).send({ email: fake_member.email }).end(function (err, res) {
                should.exist(err);
                done();
            });
        });

        it('should resend email success with exist account which not actived', function (done) {
            _superagent2.default.post(endPoint).send({ email: member.email }).end(function (err, res) {
                should.not.exist(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('email');
                done();
            });
        });
    });

    describe('#Active member account', function () {
        var endPoint = url + '/api/auth/active';

        it('should active account success with exist account which status is pending', function (done) {
            _superagent2.default.get(endPoint).query({ token: token }).end(function (err, res) {
                should.not.exist(err);
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('should active account fail with illigal token', function (done) {
            _superagent2.default.get(endPoint).query({ token: '1234567890' }).end(function (err, res) {
                should.exist(err);
                done();
            });
        });

        it('should active account fail with exist account which is actived', function (done) {
            _superagent2.default.get(endPoint).query({ token: token }).end(function (err, res) {
                should.exist(err);
                done();
            });
        });
    });

    describe('#Member signin', function () {
        var endPoint = url + '/api/member/signin';

        it('should signin fail with incorrect account or password', function (done) {
            _superagent2.default.post(endPoint).send({ email: fake_member.email, password: fake_member.password }).end(function (err, res) {
                should.exist(err);
                done();
            });
        });

        it('should signin fail with not active account', function (done) {
            _superagent2.default.post(endPoint).send({ email: new_member.email, password: new_member.password }).end(function (err, res) {
                should.exist(err);
                done();
            });
        });

        it('should signin success with correct account and password', function (done) {
            _superagent2.default.post(endPoint).send({ email: member.email, password: member.password }).end(function (err, res) {
                should.not.exist(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('email');
                done();
            });
        });
    });
});