import express from 'express';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';

import { mailer, genAuthToken } from '../libs';
import redis from '../redis';
import config from '../config';
import { Member } from '../models';

const env = config.env;
const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        req.checkBody('email', 'invalid email').isEmail().notEmpty();
        req.checkBody('password', 'invalid password').chkPassword().notEmpty();
        req.checkBody('name', 'invalid username').notEmpty();

        const err = req.validationErrors();
        if (err) throw new Error(err[0].msg);

        let { name, email, password } = req.body;
        let member = await Member.findByEmail(email);
        // member shouldn't exist
        if (member) throw new Error(11004);

        // create new member
        let data = new Member(req.body)
        let newMember = await data.new();

        // create auth token which expire time as 30 mins later at redis
        let authToken = genAuthToken(newMember.email);
        newMember.token = authToken.token;

        let html = nunjucks.render('./mailTemplates/confirm.html', {
            expireTime: authToken.expireTime,
            verifiedLink: `${config[env].web.url}/api/auth/active?token=${authToken.token}`
        });

        mailer({
            subject: '感謝您註冊 NOWnews 會員',
            to: newMember.email,
            html: html
        });

        return res.json(newMember);
    } catch (err) {
        return next(err);
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        req.checkBody('email', 'invalid email').notEmpty();
        req.checkBody('password', 'invalid password').notEmpty();
        const err = req.validationErrors();
        if (err) throw new Error(err[0].msg);

        let { email, password } = req.body;
        let member = await Member.login(email, password);
        if (!member) throw new Error(10000);
        if (member.status !== "ACTIVED") throw new Error(10002);
        
        return res.json(member);
    } catch(err) {
        return next(err);
    }
});

// thirdparty signup (e.g. Facebook Google..etc)
router.post('/thirdPartySignup', async (req, res, next) => {
    try {
        req.checkBody('thirdPartyId').notEmpty();
        req.checkBody('provider').notEmpty();
        const err = req.validationErrors();
        if (err) throw new Error();

        let { email } = req.body;
        let member = await Member.findByEmail(email);
        // if member's email is registered, return email is used? (need to discuss)
        if (member) throw new Error();

        let data = new Member(req.body);
        let newMember = await data.new();

        return res.json(newMember);
        
    } catch (err) {
        return next(err);
    }
});

router.post('/thirdPartySignin', async (req, res, next) => {
    try {
        req.checkBody('thirdPartyId').notEmpty();
        req.checkBody('provider').notEmpty();
        const err = req.validationErrors();
        if (err) throw new Error();

        let { thirdPartyId } = req.body;
        let member = Member.findByThirdPartyId(thirdPartyId);
        if (!member) throw new Error();

        return res.json(member);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
