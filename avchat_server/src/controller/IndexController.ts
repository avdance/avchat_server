import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

export class IndexController {

    async index(request: Request, response: Response, next: NextFunction) {
        response.render('index', { title: 'Express' });
    }
}