import express from 'express';
let router = express.Router();

router.route('/')
    .get((req, res, next) => {
        return res.render('home/home');
    });

module.exports = router;
