
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;
    let token = req.body.token;

    co(function*(){
        let password = yield postApi('api/password/update', {
            token: token,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        });
        if (password.type === 'error') {
            return res.send(`error/${password.message}.html`);
        }
        return res.render('members/passwordUpdateSuccess');
    }).catch(next);
};
