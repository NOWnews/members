
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';

module.exports = (app) => {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(logger('dev'));

    // view engine 設定與 views 擺放位置設定
    app.set('view engine', 'html');
    nunjucks.configure( `${rootPath}/web/views/`, {
        autoescape: true,
        express: app,
        watch: true
    });

    return (req, res, next) => {
        return next();
    };
};
