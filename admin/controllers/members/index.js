import express from 'express';
let router = express.Router();

import signup from './signup';
import signin from './signin';
import verify from './verify';

router.route('/members/signup')
    .post(signup);

router.route('/members/signin')
    .post(signin);

router.route('/members/verify')
    .get(verify);

module.exports = router;