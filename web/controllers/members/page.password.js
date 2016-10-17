
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let token = req.query.token;

    co(function*(){
        let tokenCheck = yield postApi('api/password/check', {token: token});

        if (tokenCheck.type === 'error') {
            return res.render(`error/${tokenCheck.message}.html`);
            // return res.render('members/verifyFail', {
            //     tokenCheck: tokenCheck,
            //     verifyResetUrl: '/members/verify',
            // });
            // return res.send('申請帳戶的 toekn 已經失效');
        }
        return res.render('members/passwordUpdate', { token: token });
    }).catch(next);
};
