import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Promise from 'bluebird';
import co from 'co';


module.exports = co.wrap(function*(options) {

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

    // let transporter = nodemailer.createTransport('smtps://edm%40nownews.com:nownews28331543@smtp.gmail.com');

    let mailInfo = {
        from: from || '<member@mail.nownews.com.tw>',
        to: to,
        subject: subject || '很重要，請立刻通知我們',
        html: html || '<h1>如果你收到這封信，這代表發生了很嚴重的錯誤，請馬上回報給我們。<h1>'
    };

    return yield new Promise(function(resolve, reject) {
        transporter.sendMail(mailInfo, function(err, info){
            if(err){
                console.log(err);
                return reject(err);
            }
            console.log(info);
            return resolve(info);
        });
    });
});