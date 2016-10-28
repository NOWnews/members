import express from 'express';
let router = express.Router();

import pageSign from './page.sign';
import pageSignin from './page.signin';
import pageVerify from './page.verify';
import pagePassword from './page.password';
import resetVerify from './page.resetVerify';

import actionSignin from './action.signin';
import actionSignup from './action.signup';
import actionResetVerify from './action.resetVerify';
import actionResetPassword from './action.resetPassword';
import actionUpdatePassword from './action.updatePassword';

router.route('/sign')
    .get(pageSign);

router.route('/signup')
    .post(actionSignup);

router.route('/signin')
    .post(actionSignin);

router.route('/verify')
    .get(pageVerify)
    .post(actionResetVerify);

router.route('/resetVerify')
    .get(resetVerify);

router.route('/password')
    .get(pagePassword);

router.route('/password/update')
    .post(actionUpdatePassword);

router.route('/password/reset')
    .post(actionResetPassword);

module.exports = router;
