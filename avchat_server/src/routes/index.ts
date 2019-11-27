import {UserController} from '../controller/UserController';
import {IndexController} from '../controller/IndexController';
import {LoginController} from '../controller/LoginController';

export const Routes = [{
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
    route: '/login',
    controller: LoginController,
    action: 'loginPage'
}
];