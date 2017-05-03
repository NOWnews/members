'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// set path prefix for different controllers
router.use('/member', require('./member'));
router.use('/auth', require('./authenticate'));

module.exports = function (app) {
    app.use('/api', router);
    return function (req, res, next) {
        return next();
    };
};