
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let body = req.body;
    console.log(body);
    co(function*(){
        let members = yield postApi('api/members/signin', body);
        console.log(members,'會員資訊console');
        // return res.render('member/signin');
         return res.send('登入成功');
    }).catch(next);
};
