import express from 'express';
let router = express.Router();

import errorpage10000 from './page.10000';
import errorpage10001 from './page.10001';
import errorpage10002 from './page.10002';
import errorpage10003 from './page.10003';
import errorpage10004 from './page.10004';
import errorpage10005 from './page.10005';
import errorpage10006 from './page.10006';
import errorpage10007 from './page.10007';



router.route('/page/10000')
    .get(errorpage10000);

router.route('/page/10001')
    .get(errorpage10001);

router.route('/page/10002')
    .get(errorpage10002);

router.route('/page/10003')
    .get(errorpage10003);

router.route('/page/10004')
    .get(errorpage10004);

router.route('/page/10005')
    .get(errorpage10005);

router.route('/page/10006')
    .get(errorpage10006);

router.route('/page/10007')
    .get(errorpage10007);

module.exports = router;
