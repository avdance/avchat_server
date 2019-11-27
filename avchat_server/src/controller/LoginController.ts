import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

export class LoginController {

    async loginPage(request: Request, response: Response, next: NextFunction) {
        response.render('login');
    }
}