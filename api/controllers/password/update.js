/*
 * 更新密碼
 */
const debug = require('debug')('NOWnumbers:api:controllers:password:update');

import co from 'co';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { mailer, hashPwd } from '../../../libs';
import { Member, ResetPassword } from '../../../models';

module.exports = (req, res, next) => {

    let { token, newPassword, confirmNewPassword } = req.body;

    if(newPassword !== confirmNewPassword) {
        return next(new Error(10003));
    }

    co(function*() {

        let resetPasswordInfo = yield ResetPassword.findOne()
            .where('token').equals(token)
            .where('expireTime').gt(Date.now())
            .where('status').equals('UNUSED')
            .where('trashed').equals(false)
            .execAsync();

        if(!resetPasswordInfo) {
            return Promise.reject(new Error(10005));
        }

        let member = yield Member.findOne()
            .where('email').equals(resetPasswordInfo.email)
            .where('trashed').equals(false)
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

        resetPasswordInfo.set('trashed', true);
        resetPasswordInfo.set('status', 'USED');
        member.set('password', hashPwd(newPassword));

        let [ updatedMember, updatedResetPasswordInfo ] = yield [
            member.saveAsync(),
            resetPasswordInfo.saveAsync()
        ];

        // 讀取會員認證信的樣板
        let html = nunjucks.render('./mailTemplates/updatePasswordSuccess.html', {
            name: member.name
        });

        // 非同步送出會員認證信
        mailer({
            subject: 'NOWnews 帳戶重設密碼成功',
            to: member.email,
            html: html
        });

        return res.json(updatedMember);
    })
    .catch(next);
};