import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import ErrorModel from '../model/ErrorModel'
import SuccessModel from '../model/SuccessModel'
import { UserBaseInfo } from '../entity/UserBaseInfo';
import JwTokenUtils from '../utils/JwtTokenUtil';

class LoginController {

    static login = async (req: Request, res: Response) => {

        const useLogin = await getRepository(UserBaseInfo)
            .createQueryBuilder("UserBaseInfo")
            .where("UserBaseInfo.user_name = :user_name", { user_name: req.body.user_name })
            .getOne();

        if (useLogin === null || useLogin === undefined) {

            res.json(new ErrorModel(204, "用户不存在", []))
            return;
        }

        if (req.body.password !== useLogin.password) {

            res.json(new ErrorModel(211, "密码错误", []))

        } else {

            // Token payload Generator
            const payload = {
                iss: req.body.user_name,
                passwd: req.body.password,
                time: new Date().getTime()
            }
            // Generator Token
            const token = JwTokenUtils.sigin(payload);
            res.json(new SuccessModel(0, "登陆成功", new Object({ data: {token: token, user : useLogin} })));
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
}
export default LoginController
