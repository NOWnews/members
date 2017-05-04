import express from 'express';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import jwt from 'jsonwebtoken';

import { mailer, genToken, verifyToken } from '../libs';
import config from '../config';
import redis from '../redis';
import { Member } from '../models';

const env = config.env;
const router = express.Router();

router.get('/active', async (req, res, next) => {
    try {
        req.checkQuery('token', 'invalid token').notEmpty();
        const err = req.validationErrors();
        if (err) throw new Error(err[0].msg);
        
        let { token } = req.query;

        // validate jwt token
        const decode = await verifyToken(token);
        if (!decode) throw new Error(11002);

        // check token if it is expired or used
        const value = await redis.getValue(token);
        if (!value) throw new Error(11002);

        const isSuccess = await Member.active(decode.email);
        if (!isSuccess) throw new Error(11006);

        redis.removeValue(token);

        return res.status(200).end();
    } catch (err) {
        return next(err);
    }
});

router.post('/resend', async (req, res, next) => {
    try {
        req.checkBody('email', 'invalid email').notEmpty();
        const err = req.validationErrors();
        if (err) throw new Error(err[0].msg);

        let { email } = req.body;
        let member = await Member.findByEmail(email);
        if (!member) throw new Error(11003);
        if (member.status !== 'PENDING') throw new Error(11005);

        // create auth token which expire time as 30 mins later at redis
        const expireTime = 3600; // seconds
        let { token, expireAt } = await genToken(email, expireTime);
        redis.setValue(token, expireAt, expireTime);

        let html = nunjucks.render('./mailTemplates/resetVerify.html', {
            expireTime: expireAt,
            verifiedLink: `${config[env].web.url}/api/auth/active?token=${token}`
        });

        mailer({
            subject: '重新驗證您的 NOWnews 帳戶',
            to: member.email,
            html: html
        });

        return res.json(member);
    } catch(err) {
        return next(err);
    }
});

module.exports = router;
