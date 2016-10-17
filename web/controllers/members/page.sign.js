
module.exports = (req, res, next) => {
    return res.render('members/sign', {
        signinUrl: '/members/signin',
        signupUrl: '/members/signup',
        passwordResetUrl: '/members/password/reset'
    });
};
