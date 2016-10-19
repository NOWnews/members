
import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import cookieSession from 'cookie-session';

const config = require('../../config');

module.exports = (app) => {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(logger('dev'));

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure( `${config.rootPath}/web/views/`, {
        autoescape: true,
        express: app,
        watch: true
    });

    // Session 的設定
    app.set('trust proxy', 1);
    app.use(cookieSession({
        name: 'member',
        keys: ['NOWmember', 'member']
    }));

    // 靜態檔案位置
    app.use('/static', express.static(`${config.rootPath}/web/public/`));

    return (req, res, next) => {
        return next();
    };
};
