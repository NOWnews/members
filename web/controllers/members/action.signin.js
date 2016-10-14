
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let body = req.body;

    co(function*(){
        let members = yield postApi('api/members/signin', body);
        console.log(members,'會員資訊console');
        if (members.type === 'error') {
            return res.send(`error code ${members.message}`);
        }

        // return res.render('member/signin');
        return res.send(`登入成功 ${members.email}`);
    }).catch(next);
};
