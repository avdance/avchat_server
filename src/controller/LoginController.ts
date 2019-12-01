import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import BaseDataModel from '../model/BaseDataModel'

class LoginController {  
 
    static login = async (req: Request, res: Response) => {

      /* var testModel: object = {
            'data' : {
                'account': req.body.user_name,
                'passwd': req.body.password 

            }
        };

        var resModel = new BaseDataModel(1, "login success", testModel);
        res.json(resModel);
      */
    }   
    static allList = async (req: Request, res: Response) => {
        
        //测试数据
       /* var numlist: object = {
            'data': {
                'test1': 'android',
                'key2': 'typescript' 

            }
        };
        var resModel = new BaseDataModel(1, "test api model", numlist);
        res.json(resModel);
        */
    }
    static getOneById = async (req: Request, res: Response) => {
        ;
    }
    static editUser = async (req: Request, res: Response) => {
        ;
    }
    static delUser = async (req: Request, res: Response) => {
        ;
    }
    
    async loginPage(request: Request, response: Response, next: NextFunction) {
        ;
    }
    async login(req: Request, res: Response, next: NextFunction) {
        if(req.body.username === 'danding' && req.session != null) {
            req.session.username = req.body.username;
            res.render('home', {username : req.session.username});
        } else {
            res.render('login')
        }
    }
}
export default LoginController
