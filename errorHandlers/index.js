
import PrettyError from 'pretty-error';

let prettyError = new PrettyError();

module.exports = (app) => {

    app.use((err, req, res, next) => {
        console.log(prettyError.render(err));
        res.status(400);
        return res.json({
            type: 'error',
            message: err.message
        });
    });

    return (req, res, next) => {
        return next();
    };
};