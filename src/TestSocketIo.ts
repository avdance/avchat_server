import express, {NextFunction, Request, Response} from 'express'
import { Express } from 'express-serve-static-core';
import Http from 'http'
import SocketIO from 'socket.io';
import path from 'path'
import {SocketHandler} from './socket/handler'

let app: Express = express();

let http = Http.createServer(app);

let io = SocketIO(http);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/../views/index.html');
});

io.on('connection', function(socket){
  SocketHandler.handle(socket)
});

http.listen(3000, '127.0.0.1');