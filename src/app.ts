import express, {NextFunction, Request, Response} from 'express'
import createError from 'http-errors';
import { Express } from 'express-serve-static-core';
import routes from "./routes";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {setupWithExpress} from './middleware/SetupUtils'
import SocketIO from 'socket.io';
import {SocketHandler} from './socket/handler';
import {ConnectionManager} from './utils/ConnectionManager';

ConnectionManager.initConnection( connection => {
    let app: Express = express();
    //setup something with your express
    //return socket.io instance which bind https server
    let io: SocketIO.Server = setupWithExpress(app);
    // 引入路由
    app.use(routes);
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
        //res.render('error');
        res.json(err);
    });

    io.on('connection', function(socket){
        SocketHandler.handle(socket)
    });

})
