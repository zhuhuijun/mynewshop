var express = require('express');
var router = express.Router();
var models = require('../models');
var crypto = require('crypto');
var myhelper = require('../MyHelper');
/* GET users listing. */

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
/**
 * 登录
 */
router.post('/login', function (req, res, next) {
    var user = req.body;
    var pwdo = myhelper.Md5Helper(user.upwd);
    console.info('lll'+user);
    models.User.findOne({username: user.username, upwd: pwdo}, function (err, u) {
        if (err) {
            res.status(500).json({msg: 'error'});
        } else {
            console.info(u);
            req.session.userid = u._id;
            res.json(u);
        }
    })
});
/**
 * 退出
 */
router.post('/logout', function (req, res, next) {
    req.session.userid = null;
    res.json({msg: '退出成功'})
});
//登录验证的
router.get('/validate', function (req, res, next) {
    var uid = req.session.userid;
    if (uid) {
        models.User.findOne({_id: uid}, function (err, uu) {
            if (err) {
                res.status(500).json({msg: '没有授权'});
            } else {
                res.json(uu);
            }
        })
    } else {
        res.status(401).json({msg: '没有授权'});
    }
});
module.exports = router;
