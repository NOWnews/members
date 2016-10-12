/*
 * 使用者登入
 */
const debug = require('debug')('NOWnumbers:api:controllers:members:signin');

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
            .where('trashed').equals(false)
            .select('-password')
            .execAsync();

        if(!member) {
            return Promise.reject(new Error(10000));
        }

        if(member && member.status === 'PENDING') {
            return Promise.reject(new Error(10001));
        }

        if(member && member.status === 'SUSPENDED') {
            return Promise.reject(new Error(10002));
        }

        return res.json(member);
    })
    .catch(next);
};