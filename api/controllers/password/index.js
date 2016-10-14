import express from 'express';
let router = express.Router();

import reset from './reset';
import update from './update';
import check from './check';

router.route('/password/reset')
    .post(reset);

router.route('/password/check')
    .post(check);

router.route('/password/update')
    .post(update);

module.exports = router;