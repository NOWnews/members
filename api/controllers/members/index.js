import express from 'express';
let router = express.Router();

import signup from './signup';

router.route('/members/signup')
    .post(signup);

router.route('/members/signin')
    .post();

module.exports = router;