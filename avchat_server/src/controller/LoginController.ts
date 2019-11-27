import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

export class LoginController {

    async loginPage(request: Request, response: Response, next: NextFunction) {
        response.render('login');
    }
    async login(req: Request, res: Response, next: NextFunction) {
        if(req.body.username == 'danding' && req.session != null) {
            req.session.username = req.body.username;
            res.render('home',{username : req.session.username});
        } else {
            res.render('login')
        }
    }
}