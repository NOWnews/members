import express from 'express';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { mailer } from '../libs';
import config from '../config';
import redis from '../redis';
import { Member } from '../models';

const router = express.Router();

module.exports = {
    active: async (req, res, next) => {
        try {
            req.checkQuery('token', 'invalid token').notEmpty();
            const err = req.validationErrors();
            if (err)  throw new Error(err[0].msg);
            
            let { token } = req.query;
            // search member's auth token and email from redis
            const value = await redis.getValue(token);
            if (!value) throw new Error();

            const isSuccess = await Member.active(value);
            if (!isSuccess) throw new Error('account active fail');

            redis.removeValue(token);

            return res.status(200).end();

        } catch (err) {
            return next(err);
        }
    },
    resendEmail: async (req, res, next) => {
        try {
            req.checkBody('email', 'invalid email').notEmpty();
            const err = req.validationErrors();
            if (err) throw new Error(err[0].msg);

            let { email } = req.body; 
            let member = await Member.findByEmail(email);
            if (member.status === 'ACTIVED') {
                throw new Error('account is actived');
            }
            let token = randToken.suid(16);
            let expireTime = moment().add(30, 'm').tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
            redis.setValue(token, email, 1800);
        
            let html = nunjucks.render('./mailTemplates/resetVerify.html', {
                expireTime: expireTime,
                verifiedLink: `${config[env].web.url}/api/auth/active?token=${nweVerifyInfo.token}`
            });

            mailer({
                subject: '重新驗證您的 NOWnews 帳戶',
                to: nweVerifyInfo.email,
                html: html
            });

            return res.json(member);
        } catch(err) {
            return next(err);
        }
    },
    resendSms: async (req, res, next) => {
        // some logic here.
    }
};