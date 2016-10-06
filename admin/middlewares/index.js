
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

module.exports = (app) => {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(logger('dev'));

    return (req, res, next) => {
        return next();
    };
};