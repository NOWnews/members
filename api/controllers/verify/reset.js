/*
 * 重設驗證碼
 */
const debug = require('debug')('NOWnumbers:api:controllers:verify:reset');

import co from 'co';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { mailer } from '../../../libs';
import { Member, Verify } from '../../../models';

import config from '../../../config';
const env = config.env;

module.exports = (req, res, next) => {

    let { email } = req.body;

    co(function*() {

        let [ verifyInfo, memberInfo ] = yield [
            Verify.findOne()
                .where('email').equals(email)
                .where('status').equals('UNUSED')
                .where('trashed').equals(false)
                .execAsync(),

            Member.findOne()
                .where('email').equals(email)
                .where('trashed').equals(false)
                .execAsync()
        ];

        if(memberInfo && memberInfo.status === 'VERIFIED') {
            return Promise.reject(new Error(10004));
        }

        if(memberInfo && memberInfo.status === 'SUSPENDED') {
            return Promise.reject(new Error(10002));
        }

        if(!verifyInfo) {
            return Promise.reject(new Error(10000));
        }

        let expireTime = moment(Date.now()).add(3, 'day');

        verifyInfo.set('expireTime', expireTime);
        verifyInfo.set('token', randToken.suid(16));

        let nweVerifyInfo = yield verifyInfo.saveAsync();

        // 讀取會員認證信的樣板
        let html = nunjucks.render('./mailTemplates/resetVerify.html', {
            expireTime: moment(expireTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss'),
            verifiedLink: `${config[env].web.url}/members/verify?token=${nweVerifyInfo.token}`
        });

        // 非同步送出會員認證信
        mailer({
            subject: '重新驗證您的 NOWnews 帳戶',
            to: nweVerifyInfo.email,
            html: html
        });

        return res.json(nweVerifyInfo);

    })
    .catch(next);
};