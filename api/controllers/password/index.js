import express from 'express';
let router = express.Router();

import reset from './reset';
import update from './update';

router.route('/password/reset')
    .post(reset);

router.route('/password/update')
    .post(update);

module.exports = router;