
import co from 'co';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { hashPwd, mailer } from '../../../libs';
import { Member, Verify } from '../../../models';

const birthdatRegexpString = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

module.exports = (req, res, next) => {

    let { name, email, password, confirmPassword, phone, birthday, gender } = req.body;

    co(function*() {

        if(password !== confirmPassword) {
            return Promise.reject(new Error('輸入的密碼不ㄧ致，請重新輸入'));
        }

        let aliveMember = yield Member.findOne()
            .where('email').equals(email)
            .where('trashed').equals(false)
            .execAsync();

        if(aliveMember && aliveMember.status === 'PENDING') {
            return Promise.reject(new Error('你的帳號尚未認證，請去 email 信箱收取認證信件'));
        }

        if(aliveMember && aliveMember.status === 'SUSPENDED') {
            return Promise.reject(new Error('你的帳號已經被停權，請聯絡 NOWnews 管理員'));
        }

        if(aliveMember && aliveMember.status === 'VERIFIED') {
            return Promise.reject(new Error('使用者已經存在'));
        }

        let memberData = {
            name: name,
            email: email,
            password: hashPwd(password)
        };

        if(phone) {
            memberData.phone = phone;
        }

        if(birthday && birthdatRegexpString.test(birthday)) {
            memberData.birthday = moment(birthday);
        }

        if(gender) {
            memberData.gender = gender;
        }

        let newMember = yield Member.createAsync(memberData);

        let expireTime = moment(Date.now()).add(3, 'day');

        // 新增一筆驗證資料
        let verifyToken = yield Verify.createAsync({
            email: newMember.email,
            token: randToken.suid(16),
            expireTime: expireTime
        });

        // 讀取會員認證信的樣板
        let html = nunjucks.render('./mailTemplates/confirm.html', {
            expireTime: moment(expireTime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss'),
            verifiedLink: `http://localhost:7777/member?verify=${verifyToken.token}`
        });

        // 非同步送出會員認證信
        mailer({
            to: newMember.email,
            html: html
        });

        return res.json(newMember);
    })
    .catch(next);
};
