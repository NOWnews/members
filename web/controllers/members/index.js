import express from 'express';
let router = express.Router();

import signup from './signup';
import signin from './signin';

router.route('/signup')
    .get(signup);

router.route('/signin')
    .get(signin);

module.exports = router;
