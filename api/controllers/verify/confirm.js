/*
 * 驗證使用者
 */
const debug = require('debug')('NOWnumbers:api:controllers:verify:check');

import Promise from 'bluebird';
import co from 'co';
import nunjucks from 'nunjucks';

import { mailer } from '../../../libs';
import { Member, Verify, Service } from '../../../models';

module.exports = (req, res, next) => {

    let { token } = req.body;

    co(function*() {

        // 取得認證資料
        let verifyInfo = yield Verify.findOne()
            .where('token').equals(token)
            .where('expireTime').gt(Date.now())
            .where('trashed').equals(false)
            .execAsync();

        if(!verifyInfo) {
            return Promise.reject(new Error(10006));
        }

        let { email } = verifyInfo;

        // 取得會員資料
        let member = yield Member.findOne()
            .where('email').equals(email)
            .where('trashed').equals(false)
            .execAsync();

        if(!member) {
            return Promise.reject(new Error(10000));
        }

        // 變更對應欄位
        verifyInfo.set('status', 'USED');
        verifyInfo.set('trashed', true);
        member.set('status', 'VERIFIED');

        let results = yield [
            verifyInfo.saveAsync(),
            member.saveAsync(),
            Service.createAsync({
                member: member._id,
                service: 'NOWnews'
            })
        ];

        // 讀取會員認證信的樣板
        let html = nunjucks.render('./mailTemplates/verifySuccess.html', {
            name: member.name
        });

        // 非同步送出會員認證信
        mailer({
            subject: '恭喜您成員 NOWnews 會員',
            to: member.email,
            html: html
        });

        return res.json(verifyInfo);
    })
    .catch(next);
};