
import members from './members';
import errorpage from './errorpage';
import home from './home';

module.exports = (app) => {

    app.use('/', home);
    app.use('/members', members);
    app.use('/error', errorpage);

    return (req, res, next) => {
        return next();
    };
};
