var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('crypto');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/reg', function (req, res, next) {
    var user = req.body;
    var md5 = crypto.createHash('md5');
    console.info(user);
    var md5Email = md5.update(user.uemail.toLowerCase()).digest('hex');
    var avatar = "https://secure.gravatar.com/avatar/" + md5Email + "?s=48";
    console.info(avatar);
    new models.User({
        username: 'zhuhj',
        upwd: 'pwd',
        uemail: 'email',
        avator: 'avatar'
    }).save(function (err, re) {
            if (err) {
                res.json(500, {msg: err});
            } else {
                res.json(re);
            }
        });
});
module.exports = router;
