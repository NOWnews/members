import express from 'express';
let router = express.Router();

import pageSignup from './page.signup';
import actionSignup from './action.signup';
import pageSignin from './page.signin';
import actionSignin from './action.signin';
import pageVerify from './page.verify';

router.route('/signup')
    .get(pageSignup)
    .post(actionSignup);

router.route('/signin')
    .get(pageSignin)
    .post(actionSignin);

router.route('/verify')
    .get(pageVerify);

module.exports = router;
