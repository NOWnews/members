
import Promise from 'bluebird';
import co from 'co';

import { Member, Verify } from '../../../models';

module.exports = (req, res, next) => {

    let { token } = req.query;

    co(function*() {

        let verifyInfo = yield Verify.findOne()
            .where('token').equals(token)
            .where('status').equals('UNUSED')
            .where('expireTime').gt(Date.now())
            .execAsync();

        if(!verifyInfo) {
            return Promise.reject(new Error('驗證資料已經失效'));
        }

        let { email } = verifyInfo;

        let member = yield Member.findOne()
            .where('email').equals(email)
            .where('trashed').equals(false)
            .execAsync();

        if(!member) {
            return Promise.reject(new Error('找不到使用者，請重新申請帳號'));
        }

        verifyInfo.set('status', 'USED');
        member.set('status', 'VERIFIED');

        let results = yield [
            verifyInfo.saveAsync(),
            member.saveAsync()
        ];

        return res.json(verifyInfo);
    })
    .catch(next);
};