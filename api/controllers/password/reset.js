/*
 * 送出更新密碼需求
 */
const debug = require('debug')('NOWnumbers:api:controllers:password:reset');

import co from 'co';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { mailer } from '../../../libs';
import { Member, ResetPassword } from '../../../models';

import config from '../../../config';
const env = config.env;

module.exports = (req, res, next) => {

    let { email } = req.body;

    co(function*() {

        let [ resetPasswordInfo, member ] = yield [
            ResetPassword.findOne()
                .where('email').equals(email)
                .where('trashed').equals(false)
                .execAsync(),

            Member.findOne()
                .where('email').equals(email)
                .where('trashed').equals(false)
                .execAsync()
        ];

        debug('memeber = %j', member);

        // 如果他已經申請重設密碼過了，就讓他再申請一次
        if(resetPasswordInfo) {
            resetPasswordInfo.set('trashed', true);
            resetPasswordInfo.set('status', 'GIVE_UP');
            yield resetPasswordInfo.saveAsync();
        }

        if(!member) {
            return Promise.reject(new Error(10000));
        }

        if(member && member.status === 'PENDING') {
            return Promise.reject(new Error(10001));
        }

        if(member && member.status === 'SUSPENDED') {
            return Promise.reject(new Error(10002));
        }

        let expireTime = moment(Date.now()).add(3, 'day');

        let resetPasswordRequest = yield ResetPassword.createAsync({
            email: member.email,
            token: randToken.suid(16),
            expireTime: expireTime
        });

        // 讀取會員認證信的樣板
        let html = nunjucks.render('./mailTemplates/resetPassword.html', {
            expireTime: moment(expireTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss'),
            verifiedLink: `${config[env].web.url}/members/password?token=${resetPasswordRequest.token}`
        });

        // 非同步送出會員認證信
        mailer({
            subject: '重新設定您的 NOWnews 帳戶密碼',
            to: resetPasswordRequest.email,
            html: html
        });

        return res.json(resetPasswordRequest);
    })
    .catch(next);
};