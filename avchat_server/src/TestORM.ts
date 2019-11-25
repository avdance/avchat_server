import "reflect-metadata";
import {UserBaseInfo} from './entity/UserBaseInfo';
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const userInfo = new UserBaseInfo();
    userInfo.uid = 1;
    userInfo.userName = 'danding';
    userInfo.password = '111';
    userInfo.niceName = 'danding';
    userInfo.loginStatus = 1;
    userInfo.terminalType = 1;
    
    await connection.manager.save(userInfo);
    console.log("Saved a new user with id: " + userInfo.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => 
    console.log(error)
    );