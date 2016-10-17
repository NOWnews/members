
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let email = req.body.email;
    co(function*(){
        let verify = yield postApi('api/verify/reset', { email: email});
        if (verify.type === 'error') {
            return res.redirect(`/error/page/${verify.message}`);
        }
        return res.render('members/signupSuccess');
    }).catch(next);
};
