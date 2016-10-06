
import co from 'co';
import Promise from 'bluebird';

import { hashPwd } from '../../../libs';
import { Member } from '../../../models';

module.exports = (req, res, next) => {

    let { email, password } = req.body;

    co(function*() {

        let member = yield Member.findOne()
            .where('email').equals(email)
            .where('password').equals(hashPwd(password))
            .where('status').equals('VERIFIED')
            .where('trashed').equals(false)
            .select('-password')
            .execAsync();

        if(!member) {
            return Promise.reject(new Error('找不到使用者'));
        }

        // 拿掉密碼的欄位
        delete member.password;

        return res.json(member);
    })
    .catch(next);
};