import express from 'express';

const router = express.Router();

// set path prefix for different controllers
router.use('/member', require('./member'));
router.use('/auth', require('./authenticate'));

module.exports = (app) => {
    app.use('/api', router);
    return (req, res, next) => {
        return next();
    }
};
