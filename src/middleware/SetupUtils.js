const session = require("express-session");
const ejs = require('ejs').__express
const FileStore = require('session-file-store')(session);
const path = require('path');
var fs = require('fs');
var logger =  require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser')
var https = require('https');
// 创建 session 中间件
const sessionMiddleware = session({ 
    store:new FileStore(),//数据持久化方式，这里表示本地文件存储
    secret: 'keyboard cat', //加密key 可以随意书写
    cookie: { maxAge: 60000 }//两次请求的时间差 即超过这个时间再去访问 session就会失效
 })
 var options = {
    key  : fs.readFileSync('./src/middleware/cert/test.key'),
    cert : fs.readFileSync('./src/middleware/cert/test.crt') 
}
exports.setupWithExpress = function setupWithExpress(app) {
    // view engine setup
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyparser.json()); // 使用bodyparder中间件，
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(sessionMiddleware)
    app.engine('html', ejs); // 使用ejs引擎解析html文件中ejs语法
    var https_server = https.createServer(options, app);
    //https_server.listen(3000, '0.0.0.0');
    app.listen(3000);
 }