import express from 'express';
let router = express.Router();

import pageSign from './page.sign';
import pageSignin from './page.signin';
import pageVerify from './page.verify';
import actionSignin from './action.signin';
import actionSignup from './action.signup';
import actionResetVerify from './action.resetVerify';

router.route('/sign')
    .get(pageSign);

router.route('/signup')
    .post(actionSignup);

router.route('/signin')
    .post(actionSignin);

router.route('/verify')
    .get(pageVerify)
    .post(actionResetVerify);

module.exports = router;
