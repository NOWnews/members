
import members from './members';
import password from './password';
import verify from './verify';

import models from '../../models';

module.exports = (app) => {

    app.use('/api/', members);
    app.use('/api/', password);
    app.use('/api/', verify);

    return (req, res, next) => {
        return next();
    };
};