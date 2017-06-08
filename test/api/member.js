import http from 'http';
import request from 'superagent';
import chai from 'chai';
import Promise from 'bluebird';
import jsonfile from 'jsonfile';
import app from '../../app';
import { Member } from '../../models';
import errCode from '../../errorHandlers/errCode';

const config = require('../../config')[`${process.env.NODE_ENV}`];
const initDataPath = './test/config/initdata.json';

const should = chai.should();
const expect = chai.expect;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8888';

const url = `${host}:${port}`;
let server = null;

const initData = jsonfile.readFileSync(initDataPath, (err, obj) => {
    return obj;
});

const { member, newMember, fakeMember } = initData;

describe('Member APIs', () => {
    // dirty code, need to refactoring
    let token = null;
    before('Setup', (done) => {
        app.set('port', port);
        server = http.createServer(app);
        server.listen(port);
        Member.remove({}, function(err) {
            if (err) {
                throw err;
            }
            request.post(`${url}/api/member/signup`)
                .send(member)
                .end((err, res) => {
                    token = res.body.token;
                    console.log('initialize');
                    done();
                })
        });
    });

    after('Clean', (done) => {
        Member.remove({}, function(err) {
            if (err) {
                throw err;
            }
            console.log('Finished.');
            server.close();
            done();
        });
    });

    describe('#Member signup', () => {
        const endPoint = `${url}/api/member/signup`;

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
                .send(newMember)
                .end((err, res) => {
                    should.not.exist(err);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('email');
                    done();
                })
        });
    });

    describe('#Resend active account email', () => {
        const endPoint = `${url}/api/auth/resend`;

        it('should resend email fail with not exist account', (done) => {
            request.post(endPoint)
                .send({ email: fakeMember.email })
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });

        it('should resend email success with exist account which not actived', (done) => {
            request.post(endPoint)
                .send({ email: member.email })
                .end((err, res) => {
                    should.not.exist(err);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('email');
                    done();
                });
        });
    });

    describe('#Active member account', () => {
        const endPoint = `${url}/api/auth/active`;

        it('should active account success with exist account which status is pending', (done) => {
            request.get(endPoint)
                .query({ token })
                .end((err, res) => {
                    should.not.exist(err);
                    expect(res.status).to.equal(200);
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

        it('should signin fail with incorrect account or password', (done) => {
            request.post(endPoint)
                .send({ email: fakeMember.email, password: fakeMember.password })
                .end((err, res) => {
                    should.exist(err);
                    done();
                });
        });

        it('should signin fail with not active account', (done) => {
            request.post(endPoint)
                .send({ email: newMember.email, password: newMember.password })
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
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('email');
                    done();
                })
        });
    })

    // describe('#Get Member profile', () => {
    //     const endPoint = `${url}/api/member/profile`;

    //     it('should get member profile success with exist account', (done) => {
    //         request
    //             .get(endPoint)
    //             .set('X-NOWnews-Member', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxva2kwMTE5QGdtYWlsLmNvbSIsImV4cGlyZUF0IjoiMjAxNy0wNi0wOCAxNzo1MDoxOSIsImlhdCI6MTQ5NjkxMTgxOSwiZXhwIjoxNDk2OTE1NDE5fQ.hkVbJL8z2Q5CrxE9CgeemC12pDAnUAhsdO58r1YVbsI')
    //             .end((err, res) => {
    //                 should.not.exist(err);
    //                 done();
    //             })
                
    //     });
    // })

    // describe('#Member profile update', () => {
    //     const endPoint = `${url}/api/member/profile/update`;

    //     it('should get member profile success with exist account', (done) => {
    //         request
    //             .get(endPoint)
    //             .set('X-NOWnews-Member')
    //             .end((err, res) => {
    //                 should.not.exist(err);
    //                 done();
    //             })
                
    //     });
    // })
});
