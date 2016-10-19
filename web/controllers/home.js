import express from 'express';
let router = express.Router();

router.route('/')
    .get((req, res, next) => {
        let user = req.session.user;
        // if (!user) {
        //     return res.redirect('members/sign');
        // }
        return res.render('home/home', user);
    });

module.exports = router;
