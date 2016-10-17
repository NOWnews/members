
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let email = req.body.email;
    co(function*(){
        let password = yield postApi('api/password/reset', { email: email});
        if (password.type === 'error') {
            return res.redirect(`/error/page/${password.message}`);
        }
        return res.render('members/passwordResetSuccess');
    }).catch(next);
};
