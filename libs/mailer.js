import nodemailer from 'nodemailer';
import Promise from 'bluebird';
import co from 'co';


module.exports = co.wrap(function*(options) {

    let { from, to, subject, html } = options;

    let transporter = nodemailer.createTransport('smtps://edm%40nownews.com:nownews28331543@smtp.gmail.com');

    let mailInfo = {
        from: from || '<edm@nownews.com>',
        to: to,
        subject: subject || '感謝您註冊 NOWnews 會員',
        html: html || '<p>test<p>'
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