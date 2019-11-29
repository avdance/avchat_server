import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

export class IndexController {

    async index(req: Request, res: Response, next: NextFunction) {
        if(req.session != null && req.session.username) {
            res.render('home', {username: req.session.username});
        } else {
            res.redirect('login')
        }
    }
}
