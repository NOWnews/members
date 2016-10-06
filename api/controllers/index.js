
import members from './members';

import models from '../../models';

module.exports = (app) => {

    app.use('/api/', members);

    return (req, res, next) => {
        return next();
    };
};