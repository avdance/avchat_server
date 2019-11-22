import express,{NextFunction, Request, Response} from 'express'
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Express } from 'express-serve-static-core';
import {IndexRoute} from './routes/index'
import ErrorHandler from 'errorhandler'
import "reflect-metadata";
import {User} from './entity/User';
import {createConnection} from "typeorm";

let app: Express = express();
let router: express.Router;
router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//路由注册
IndexRoute.create(router);
app.use('/', router);


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});


// error handler
 app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(res.statusCode || 500);
    res.render('error');
  });
  

