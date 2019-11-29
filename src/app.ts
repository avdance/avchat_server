import express, {NextFunction, Request, Response} from 'express'
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { Express } from 'express-serve-static-core';
import ErrorHandler from 'errorhandler'
import {Routes} from "./routes";
import "reflect-metadata";
import {createConnection} from "typeorm";
import session, {SessionOptions} from 'express-session'
import connectRedis = require('connect-redis')
import bodyparser = require('body-parser')
import {setupWithExpress} from './middleware/SetupUtils'

let router: express.Router;
router = express.Router();

createConnection().then(async connection => {
    let app: Express = express();

    //setup something with your express
    setupWithExpress(app);

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: () => void) => {
            const result = (new (route.controller as any)())[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(myres => myres !== null && myres !== undefined ? res.send(myres) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // start express server
    app.listen(3000);

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

})
