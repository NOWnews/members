
import compression from 'compression';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';

module.exports = (app) => {

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator({
        customValidators: {
            chkPassword: function(value) {
                const regStr = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,16}$/;
                console.log('---');
                console.log(regStr.test(value));
                return regStr.test(value);
            }
        }
    }));
    app.use(cors());
    app.use(logger('dev'));

    return (req, res, next) => {
        return next();
    };
};