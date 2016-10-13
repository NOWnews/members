
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let body = req.body;

    co(function*(){
        let members = yield postApi('api/members/signup', body);

        return res.render('members/signup');
    }).catch(next);
};
