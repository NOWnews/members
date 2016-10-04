
import crypto from 'crypto';

const constString = '$nownews@members.&^';

module.exports = (password) => {
    let hashString = constString + password;
    return crypto.createHash('md5').update(hashString).digest('hex');
};