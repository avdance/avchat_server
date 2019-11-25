import express,{NextFunction, Request, Response} from 'express'
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Express } from 'express-serve-static-core';
import {IndexRoute} from './routes/index'
import ErrorHandler from 'errorhandler'
import {Routes} from "./routes/routes";
import "reflect-metadata";
import {createConnection} from "typeorm";


let router: express.Router;
router = express.Router();


createConnection().then(async connection => {
    let app: Express = express();

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));


    // start express server
    app.listen(3000);

    // catch 404 and forward to error handler
    app.use(function(req: Request, res: Response, next: Function) {
        next(createError(404));
    });

    // error handler
    app.use(function(err: Error, req: Request, res: Response, next: Function) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(res.statusCode || 500);
        res.render('error');
    });

})

  

