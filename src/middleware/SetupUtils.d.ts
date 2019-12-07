import { Express } from 'express-serve-static-core';
import SocketIO from 'socket.io';

declare function setupWithExpress(app: Express): SocketIO.Server;
