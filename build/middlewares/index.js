'use strict';

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

    app.use((0, _compression2.default)());
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: false }));
    app.use((0, _expressValidator2.default)({
        customValidators: {
            chkPassword: function chkPassword(value) {
                var regStr = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,16}$/;
                console.log('---');
                console.log(regStr.test(value));
                return regStr.test(value);
            }
        }
    }));
    app.use((0, _cors2.default)());
    app.use((0, _morgan2.default)('dev'));

    return function (req, res, next) {
        return next();
    };
};