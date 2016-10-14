/*
 * 確認 token
 */
const debug = require('debug')('NOWnumbers:api:controllers:password:check');

import co from 'co';
import Promise from 'bluebird';

import { ResetPassword } from '../../../models';

module.exports = (req, res, next) => {

    let { token } = req.body;

    co(function*() {

        let resetPasswordInfo = yield ResetPassword.findOne()
            .where('token').equals(token)
            .where('expireTime').gt(Date.now())
            .where('status').equals('UNUSED')
            .where('trashed').equals(false)
            .execAsync();

        if(!resetPasswordInfo) {
            return Promise.reject(new Error(10005));
        }

        return res.json(resetPasswordInfo);
    })
    .catch(next);
};