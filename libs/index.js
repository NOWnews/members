import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Promise from 'bluebird';
import randToken from 'rand-token';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

import config from '../config';
import redis from '../redis';

module.exports = {
    genToken: async (email, expireTime) => {
        const secretKey = config.secretkey;
        const expireAt = moment().add(expireTime, 'seconds').tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
        try {
            const token = jwt.sign({ email, expireAt }, secretKey, { expiresIn: '1h' });
            return Promise.resolve({ token, expireAt });
        } catch(err) {
            return Promise.reject(err);
        }
    },
    verifyToken: async (token) => {
        const secretKey = config.secretkey;
        try {
            const decode = jwt.verify(token, secretKey);
            return Promise.resolve(decode);
        } catch(err) {
            console.log(err);
            return Promise.reject(new Error(11002));
        }
    },
    mailer: async (options) => {
        let { from, to, subject, html } = options;
        let transporter = nodemailer.createTransport(smtpTransport({
            host: 'mail.nownews.com.tw',
            port: 465,
            secure: true,
            auth: {
                user: 'member@mail.nownews.com.tw',
                pass: '5j18ru,4'
            },
            tls: {
                rejectUnauthorized: false
            }
        }));

        let mailInfo = {
            from: from || '<member@mail.nownews.com.tw>',
            to: to,
            subject: subject || '很重要，請立刻通知我們',
            html: html || '<h1>如果你收到這封信，這代表發生了很嚴重的錯誤，請馬上回報給我們。<h1>'
        };

        return await new Promise((resolve, reject) => {
            transporter.sendMail(mailInfo, (err, info) => {
                if(err){
                    return reject(err);
                }
                console.log(info);
                return resolve(info);
            });
        });
    } 
}
