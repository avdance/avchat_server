const session = require("express-session");
const ejs = require('ejs').__express
const FileStore = require('session-file-store')(session);

// 创建 session 中间件
const sessionMiddleware = session({ 
    store:new FileStore(),//数据持久化方式，这里表示本地文件存储
    secret: 'keyboard cat', //加密key 可以随意书写
    cookie: { maxAge: 60000 }//两次请求的时间差 即超过这个时间再去访问 session就会失效
 })

exports.setupWithExpress = function setupWithExpress(app) {
     app.use(sessionMiddleware)
     app.engine('html', ejs); // 使用ejs引擎解析html文件中ejs语法
 }