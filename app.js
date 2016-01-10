var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var session=require('express-session');
var mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:28017/zhufeng");
var flash=require('connect-flash');



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
/******************************************************///引擎使用的设置
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
/******************************************************////----------end
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//url中间件
app.use(cookieParser());//cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//静态文件中间件
/***************************************************///自己的中间件
//执行玩中间件后 req.session
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'zfsecret',//密钥
    key: 'zhufengkey',//cookie name
    cookie: {maxAge: 1000 * 60 * 60}//设置过期时间
}));
app.use(flash());
/*****************************************************///路由的配置
app.use('/', routes);
app.use('/users', users);
/****************************************************///捕获404错误并转发到错误处理的中间件
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
/****************************************************///错误处理的中间件有四个参数
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {//渲染模板
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user//生产环境没有堆栈信息
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
