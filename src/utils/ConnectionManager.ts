import {Connection, createConnection} from "typeorm";

export class ConnectionManager {
    private static ins: Connection 
    static getInstance() {
        if(ConnectionManager.ins == null) 
            throw new Error("connection uninitiated");
        return ConnectionManager.ins;
    }
    static initConnection(callback: (conn: Connection)=> void | null) {
        if(ConnectionManager.ins == null) {
            createConnection().then(async connection => {
                ConnectionManager.ins = connection;
                if(callback != null)
                    callback(connection)
            });
        }
    }
}