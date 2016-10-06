
import members from './members';

import models from '../../models';

module.exports = (app) => {

    app.use('/', members);

    return (req, res, next) => {
        return next();
    };
};