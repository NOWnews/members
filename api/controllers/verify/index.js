import express from 'express';
let router = express.Router();

import confirm from './confirm';
import reset from './reset';

router.route('/verify/confirm')
    .post(confirm);

router.route('/verify/reset')
    .post(reset);

module.exports = router;