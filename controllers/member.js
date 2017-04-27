import express from 'express';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import moment from 'moment-timezone';
import randToken from 'rand-token';

import { mailer } from '../libs';
import redis from '../redis';
import config from '../config';
import { Member } from '../models';

const env = config.env;
const router = express.Router();

module.exports = {
    // email signup
    signup: async (req, res, next) => {
        try {
            req.checkBody('email', 'invalid email').isEmail().notEmpty();
            req.checkBody('password', 'invalid password').chkPassword().notEmpty();
            req.checkBody('name', 'invalid username').notEmpty();

            const err = req.validationErrors();
            if (err) throw new Error(err[0].msg);

            let { name, email, password } = req.body;
            let member = await Member.findByEmail(email);
            // member shouldn't exist
            if (member) {
                throw new Error();
            }
            // create new member
            let data = new Member(req.body)
            let newMember = await data.new();

            // set auth token to redis and set the expire time as 30 mins later
            let token = randToken.suid(16);
            let expireTime = moment().add(30, 'm').tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
            redis.setValue(token, newMember.email, 1800);

            let html = nunjucks.render('./mailTemplates/confirm.html', {
                expireTime: expireTime,
                verifiedLink: `${config[env].web.url}/api/auth/active?token=${token}`
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
    },
    signin: async (req, res, next) => {
        try {
            req.checkBody('email', 'invalid email').notEmpty();
            req.checkBody('password', 'invalid password').notEmpty();
            const err = req.validationErrors();
            if (err) throw new Error(err[0].msg);

            let { email, password } = req.body;
            let member = await Member.login(email, password);
            if (!member) {
                throw new Error();
            }
            if (member.status !== "ACTIVED") {
                console.log(member.status);
                throw new Error();
            }
            return res.json(member);
        } catch(err) {
            return next(err);
        }
    },
    // thirdparty signup (e.g. Facebook Google..etc)
    thirdPartySignup: async (req, res, next) => {
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
    },
    // facebook/google login
    thirdPartySignin: async (req, res, next) => {
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
    },
};
