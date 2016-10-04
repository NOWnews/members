
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
            .select('-password')
            .execAsync();

        if(!member) {
            return Promise.reject(new Error('找不到使用者'));
        }

        return res.json(member);
    })
    .catch(next);
};