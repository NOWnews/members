import express from 'express';
let router = express.Router();

import pageSignup from './page.signup';
import actionSignup from './action.signup';
import pageSignin from './page.signin';
import actionSignin from './action.signin';

router.route('/signup')
    .get(pageSignup)
    .post(actionSignup);

router.route('/signin')
    .get(pageSignin)
    .post(actionSignin);

module.exports = router;
