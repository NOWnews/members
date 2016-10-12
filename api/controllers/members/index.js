import express from 'express';
let router = express.Router();

import signup from './signup';
import signin from './signin';

router.route('/members/signup')
    .post(signup);

router.route('/members/signin')
    .post(signin);

module.exports = router;