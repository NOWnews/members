
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let body = req.body;

    co(function*(){
        let member = yield postApi('members/signin', body);

        return res.render('member/signin');
    }).catch(next);
};
