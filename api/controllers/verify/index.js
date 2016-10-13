import express from 'express';
let router = express.Router();

import check from './check';
import reset from './reset';

router.route('/verify/check')
    .post(check);

router.route('/verify/reset')
    .post(reset);

module.exports = router;