
module.exports = (req, res, next) => {
    console.log(req.query.verify);
    return res.render('members/verify');
};
