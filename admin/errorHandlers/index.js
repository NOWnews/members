
import PrettyError from 'pretty-error';

let prettyError = new PrettyError();

module.exports = (app) => {

    app.use((err, req, res, next) => {
        console.log(prettyError.render(err));
        return res.sendStatus(400);
    });

    return (req, res, next) => {
        return next();
    };
};