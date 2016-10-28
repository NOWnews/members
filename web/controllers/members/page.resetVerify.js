import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let token = req.query.token;

    co(function*(){
        // let tokenCheck = yield postApi('api/verify/confirm', {token: token});

        // if (tokenCheck.type === 'error') {
        //     return res.redirect(`/error/page/${tokenCheck.message}`);
        //     // return res.render('members/verifyFail', {
        //     //     tokenCheck: tokenCheck,
        //     //     verifyResetUrl: '/members/verify',
        //     // });
        //     // return res.send('申請帳戶的 toekn 已經失效');
        // }
        return res.render('members/resetVerify', { verifyResetUrl: '/members/verify' });
    }).catch(next);
};
