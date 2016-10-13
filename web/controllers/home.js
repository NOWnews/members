import express from 'express';
let router = express.Router();

router.route('/')
    .get((req, res, next) => {
        if (!req.session.user) {
            return res.redirect('members/signup');
        }
        return res.render('home/home');
    });

module.exports = router;
