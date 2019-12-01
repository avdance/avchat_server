import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import SuccessModel from '../model/SuccessModel'
import ErrorModel from '../model/ErrorModel'
import { UserBaseInfo } from '../entity/UserBaseInfo';
import { getConnection } from "typeorm";

class RegisterController {

    static regist = async (req: Request, res: Response) => {

        //Parameter determination
        if (req.body.user_name === undefined ||
            req.body.password === undefined ||
            req.body.nice_name === undefined) {
            res.json(new ErrorModel(202, "非法的请求参数", []))

        }
        
        //判断用户是否存在
        const userInfo = new UserBaseInfo();
        userInfo.userName = req.body.user_name;
        userInfo.password = req.body.password;
        userInfo.niceName = req.body.nice_name;
     
        const userRegist = await getRepository(UserBaseInfo)
                           . createQueryBuilder("UserBaseInfo")
                           . where("UserBaseInfo.user_name = :user_name", { user_name:  req.body.user_name })
                           . getOne();
               
        if (userRegist !== null || userRegist !== undefined) {

            res.json(new ErrorModel(203, "用户已存在", []))
            return;
        }
        userInfo.loginStatus = 0;
        userInfo.createtime = new Date();
        await getConnection().manager.save(userInfo).then(userBaseInfo => { 
            res.json(new SuccessModel(0, "登陆成功", new Object({data : userBaseInfo})));
        });
        //error api responese  
      
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
        if (req.body.username === 'danding' && req.session != null) {
            req.session.username = req.body.username;
            res.render('home', { username: req.session.username });
        } else {
            res.render('login')
        }
    }
}
export default RegisterController
