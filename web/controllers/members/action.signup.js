
import co from 'co';
import postApi from '../../util/postApi';

module.exports = (req, res, next) => {
    let body = req.body;

    co(function*(){
        let members = yield postApi('api/members/signup', body);
        if (members.type === 'error') {
            return res.redirect(`/error/page/${members.message}`);
        }
        return res.render('members/signupSuccess');
    }).catch(next);
};
