
import co from 'co';
import Promise from 'bluebird';

import { hashPwd } from '../../../libs';
import { Member } from '../../../models';

module.exports = (req, res, next) => {

    let { name, email, password, phone, birthday, gender } = req.body;

    co(function*() {

        let aliveMember = yield Member.findOne()
            .where('email').equals(email)
            .execAsync();

        if(aliveMember) {
            return Promise.reject(new Error('使用者已經存在'));
        }

        let memberData = {
            name: name,
            email: email,
            password: hashPwd(password)
        };

        if(phone) {
            memberData.phone = phone;
        }

        if(birthday) {
            memberData.birthday = birthday;
        }

        if(gender) {
            memberData.gender = gender;
        }

        let newMember = yield Member.createAsync(memberData);

        return res.json(newMember);
    })
    .catch(next);
};