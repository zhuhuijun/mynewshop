var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('crypto');
var myhelper = require('../MyHelper');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/reg', function (req, res, next) {
    var user = req.body;
    var md5Email = myhelper.Md5Helper(user.uemail);
    var avatar = "https://secure.gravatar.com/avatar/" + md5Email + "?s=48";
    console.info(avatar);
    new models.User({
        username: user.username,
        upwd: myhelper.Md5Helper(user.upwd),
        uemail: user.uemail,
        avator: avatar
    }).save(function (err, re) {
            if (err) {
                res.json(500, {msg: err});
            } else {
                res.json(re);
            }
        });
});
module.exports = router;
