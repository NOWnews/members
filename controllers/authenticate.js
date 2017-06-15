import express from 'express';
import Promise from 'bluebird';
import nunjucks from 'nunjucks';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { mailer, genToken, verifyToken } from '../libs';
import config from '../config';
import redis from '../redis';
import { Member } from '../models';

const env = config.env;
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.use(new GoogleStrategy({
    clientID: config.oauth.clientId,
    clientSecret: config.oauth.clientSecret,
    callbackURL: config.oauth.callbackURL,
    scope: ['openid', 'email', 'profile']
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    return done(null, profile)
  }
));

router.post('/signin', async (req, res, next) => {
    try {
        req.checkBody('email', 'invalid email').notEmpty();
        req.checkBody('password', 'invalid password').notEmpty();
        const err = req.validationErrors();
        if (err) {
            throw new Error(err[0].msg);
        }

        let { email, password } = req.body;
        let member = await Member.verify(email, password);

        if (!member) {
            throw new Error(10000);
        }

        if (member.status !== "ACTIVED") {
            throw new Error(10002);
        }

        // generate api token
        const expireTime = 3600; // seconds
        let token = await genToken(member.id, 'login');
        redis.setValue(token, member, 1800);
        member.token = token;

        return res.json(member);
    } catch(err) {
        return next(err);
    }
});

router.get('/oauth', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

router.get('/oauth/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async function(req, res) {
        try {
            const { id, gender } = req.user;
            const email = req.user.emails[0].value;
            const name = req.user.name.givenName;
            let member = await Member.findByGoogleId(id);
            if (!member) {
                const obj = {
                    googleId: id,
                    email: email,
                    name: name,
                    gender: gender
                }
                let data = new Member(obj)
                member = await data.new();
            }
            let token = await genToken(member.id, 'login');
            redis.setValue(token, member, 1800);
            return res.redirect(`https://dev.nownews.com/api/oauth_callback?token=${token}`);
        } catch (err) {
            console.log(err);
            return res.status(500);
        }
    }
);

// router.get('/active', async (req, res, next) => {
//     try {
//         req.checkQuery('token', 'invalid token').notEmpty();
//         const err = req.validationErrors();
//         if (err) {
//             throw new Error(err[0].msg);
//         }

//         let { token } = req.query;

//         // validate jwt token
//         const decode = await verifyToken(token);
//         if (!decode) {
//             throw new Error(11002);
//         }

//         // check token if it is expired or used
//         const value = await redis.getValue(token);
//         if (!value) {
//             throw new Error(11002);
//         }

//         const isSuccess = await Member.active(decode.email);
//         if (!isSuccess) {
//             throw new Error(11006);
//         }

//         await redis.removeValue(token);

//         return res.json({ "status": "success" });
//     } catch (err) {
//         return next(err);
//     }
// });

// router.post('/resend', async (req, res, next) => {
//     try {
//         req.checkBody('email', 'invalid email').notEmpty();
//         const err = req.validationErrors();
//         if (err) {
//             throw new Error(err[0].msg);
//         }

//         let { email } = req.body;
//         let member = await Member.findByEmail(email);
//         if (!member) {
//             throw new Error(11003);
//         }

//         if (member.status !== 'PENDING') {
//             throw new Error(11005);
//         }

//         // create auth token which expire time as 30 mins later at redis
//         const expireTime = 3600; // seconds
//         let { token, expireAt } = await genToken(email, expireTime);
//         await redis.setValue(token, expireAt, expireTime);

//         let html = nunjucks.render('./mailTemplates/resetVerify.html', {
//             expireTime: expireAt,
//             verifiedLink: `${config[env].web.url}/api/auth/active?token=${token}`
//         });

//         mailer({
//             subject: '重新驗證您的 NOWnews 帳戶',
//             to: member.email,
//             html: html
//         });

//         return res.json(member);
//     } catch(err) {
//         return next(err);
//     }
// });

// router.get('/forgotPasswd', async (req, res, next) => {
//     try {
//       req.checkQuery('token', 'invalid token').notEmpty();
//         const err = req.validationErrors();
//         if (err) {
//             throw new Error(err[0].msg);
//         }

//         let { token } = req.query;

//         // validate jwt token
//         const decode = await verifyToken(token);
//         if (!decode) {
//             throw new Error(11002);
//         }
//         // check token if it is expired or used
//         const value = await redis.getValue(token);
//         if (!value) {
//             throw new Error(11002);
//         }

//         const member = await Member.findByEmail(decode.email);
//         if (!member) {
//             throw new Error(10000);
//         }

//         await redis.removeValue(token);

//         return res.json(member);
//     } catch (err) {
//         return next(err);
//     }
// });


// // thirdparty signup (e.g. Facebook Google..etc)
// router.post('/thirdPartySignup', async (req, res, next) => {
//     try {
//         req.checkBody('thirdPartyId').notEmpty();
//         req.checkBody('provider').notEmpty();
//         const err = req.validationErrors();
//         if (err) {
//             throw new Error(err[0].msg);
//         }

//         let { email } = req.body;
//         let member = await Member.findByEmail(email);
//         // if member's email is registered, return email is used? (need to discuss)
//         if (member) {
//             throw new Error(11004);
//         }
//         let data = new Member(req.body);
//         let newMember = await data.new();

//         return res.json(newMember);
//     } catch (err) {
//         return next(err);
//     }
// });

// router.post('/thirdPartySignin', async (req, res, next) => {
//     try {
//         req.checkBody('thirdPartyId').notEmpty();
//         req.checkBody('provider').notEmpty();
//         const err = req.validationErrors();
//         if (err) {
//             throw new Error(err[0].msg);
//         }
//         let { thirdPartyId } = req.body;
//         let member = Member.findByThirdPartyId(thirdPartyId);
//         if (!member) {
//             throw new Error(10000);
//         }
//         return res.json(member);
//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = router;
