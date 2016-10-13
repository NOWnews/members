
import members from './members';
import home from './home';

module.exports = (app) => {

    app.use('/', home);
    app.use('/', members);
    app.get('/verify', members);

    return (req, res, next) => {
        return next();
    };
};
