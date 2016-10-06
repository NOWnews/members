
import members from './members';

import models from '../../models';

module.exports = (app) => {

    app.use('/admin/', members);

    return (req, res, next) => {
        return next();
    };
};