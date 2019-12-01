import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import ErrorModel from '../model/ErrorModel'
import SuccessModel from '../model/SuccessModel'
import { UserBaseInfo } from '../entity/UserBaseInfo';

class LoginController {  
 
    static login = async (req: Request, res: Response) => {

        const useLogin = await getRepository(UserBaseInfo)
        . createQueryBuilder("UserBaseInfo")
        . where("UserBaseInfo.user_name = :user_name", { user_name:  req.body.user_name })
        . getOne();

        if (useLogin === null || useLogin === undefined ) {

            res.json(new ErrorModel(204, "用户不存在", []))
            return;
        }

        if(req.body.password !== useLogin.password){

            res.json(new ErrorModel(211, "密码错误", []))

        }else{
          
            res.json(new SuccessModel(0, "登陆成功", new Object({data : useLogin})));
        }
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
