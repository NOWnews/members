require('babel-core/register');
require('babel-polyfill');

import http from 'http';
import request from 'superagent';
import chai from 'chai';
import Promise from 'bluebird';
import jsonfile from 'jsonfile';
import app from '../../app';
import { Member } from '../../models';

const config = require('../../config')[`${process.env.NODE_ENV}`];
const initDataPath = './test/config/initdata.json';

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8888';

const url = `${host}:${port}`;
let server = null;

const initData = jsonfile.readFileSync(initDataPath, (err, obj) => {
    return obj;
});

const { member, new_member, fake_member } = initData;

describe('Member APIs', () => {
    // dirty code, need to refactoring
    let token = null;
    before('Setup', async (done) => {
        app.set('port', port);
        server = http.createServer(app);
        server.listen(port);
        await Member.remove({}, function(err) { 
            console.log('collection removed') 
        });
        done();
    });

    after('Clean', async (done) => {
        server.close();
        done();
    });

    describe('#Member signup', () => {
        const endPoint = `${url}/api/member/signup`;
        before('Setup', async (done) => {
            request.post(endPoint)
                .send(member)
                .end((err, res) => {
                    token = res.body.token.fulfillmentValue.token;
                    console.log(res.body.token.fulfillmentValue.token);
                    done();
                })
        });

        after('Clean', (done) => {
            done();
        });

        it('should signup fail with exist account', (done) => {
            request.post(endPoint)
                .send(member)
                .end((err, res) => {
                    should.exist(err);
                    done();
                })
        });

        it('should signup success with not exist account', (done) => {
            request.post(endPoint)
                .send(new_member)
                .end((err, res) => {
                    should.not.exist(err);
                    done();
                })
        });
    });

    describe('#Resend active account email', () => {
        const endPoint = `${url}/api/auth/resend`;
        before('Setup', async (done) => {
            done();
        });

        after('Clean', (done) => {
            done();
        });

        it('should resend email fail with not exist account', (done) => {
            request.post(endPoint)
                .send({ email: fake_member.email })
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });

        it('should resend email fail with actived account', (done) => {
            done();
        })

        it('should resend email success with exist account which not actived', (done) => {
            request.post(endPoint)
                .send({ email: member.email })
                .end((err, res) => {
                    should.not.exist(err);
                    done();
                });
        });
    });

    describe('#Active member account', () => {
        const endPoint = `${url}/api/auth/active`;
        before('Setup', (done) => {
            done();
        });

        after('Clean', (done) => {
            done();
        });

        it('should active account success with exist account which status is pending', (done) => {
            request.get(endPoint)
                .query({ token })
                .end((err, res) => {
                    should.not.exist(err);
                    done();
                })
        });

        it('should active account fail with illigal token', (done) => {
            request.get(endPoint)
                .query({ token: '1234567890' })
                .end((err, res) => {
                    should.exist(err);
                    done();
                })
        });

        it('should active account fail with exist account which is actived', (done) => {
            request.get(endPoint)
                .query({ token })
                .end((err, res) => {
                    should.exist(err);
                    done();
                })
        });
    });

    describe('#Member signin', () => {
        const endPoint = `${url}/api/member/signin`;
        before('Setup', (done) => {
            done();
        });

        after('Clean', (done) => {
            done();
        });

        it('should signin fail with incorrect account or password', (done) => {
            request.post(endPoint)
                .send({ email: fake_member.email, password: fake_member.password })
                .end((err, res) => {
                    should.exist(err);
                    done();
                })
        });

        it('should signin fail with not active account', (done) => {
            request.post(endPoint)
                .send({ email: new_member.email, password: new_member.password })
                .end((err, res) => {
                    should.exist(err);
                    done();
                })
        });

        it('should signin success with correct account and password', (done) => {
            request.post(endPoint)
                .send({ email: member.email, password: member.password })
                .end((err, res) => {
                    should.not.exist(err);
                    done();
                })
        });
    })
});
