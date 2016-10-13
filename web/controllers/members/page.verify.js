
module.exports = (req, res, next) => {
    console.log(req.query);
    return res.render('member/verify');
};
