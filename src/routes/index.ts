import { Router} from "express";
import {UserController} from '../controller/UserController';
import {IndexController} from '../controller/IndexController';
import LoginController from '../controller/LoginController';
import login from './Login'
import regist from './Register'
//add new routes framework  add by guojianyong
const routes = Router();
routes.use('/api/login', login)
routes.use('/api/regist', regist)
//Keep history test interface 
const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: 'get',
    route: '/',
    controller: IndexController,
    action: 'index'
}, {
    method: 'get',
    route: '/login_',
    controller: LoginController,
    action: 'loginPage'
}, {
    method: 'post',
    route: '/login_',
    controller: LoginController,
    action: 'login'
}
];

export {
    Routes,
    routes
}