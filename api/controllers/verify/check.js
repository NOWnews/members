/*
 * 驗證使用者
 */
const debug = require('debug')('NOWnumbers:api:controllers:verify:check');

import Promise from 'bluebird';
import co from 'co';

import { Member, Verify } from '../../../models';

module.exports = (req, res, next) => {

    let { token } = req.body;

    co(function*() {

        let verifyInfo = yield Verify.findOne()
            .where('token').equals(token)
            .where('expireTime').gt(Date.now())
            .where('trashed').equals(false)
            .execAsync();

        if(!verifyInfo) {
            return Promise.reject(new Error(10006));
        }

        let { email } = verifyInfo;

        let member = yield Member.findOne()
            .where('email').equals(email)
            .where('trashed').equals(false)
            .execAsync();

        if(!member) {
            return Promise.reject(new Error(10000));
        }

        verifyInfo.set('status', 'USED');
        verifyInfo.set('trashed', true);
        member.set('status', 'VERIFIED');

        let results = yield [
            verifyInfo.saveAsync(),
            member.saveAsync()
        ];

        return res.json(verifyInfo);
    })
    .catch(next);
};