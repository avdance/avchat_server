import { Request, Response } from "express";
import SuccessModel from '../model/SuccessModel'
import ErrorModel from '../model/ErrorModel'
import { UserDetailInfo } from "../entity/UserDetailInfo";
import { BaseController } from './BaseController';
import { ConnectionManager } from '../utils/ConnectionManager';

class UserController {

    static regist = async (req: Request, res: Response) => {

        ;

    }
    static allList = async (req: Request, res: Response) => {

        ;
    }
    static getUserDetailInfo = async (req: Request, res: Response) => {

        BaseController.verify(req, res).then((uid) => {

            //Parameter determination
            if (req.body.uid === undefined) {
                res.json(new ErrorModel(202, "参数错误", []))
                return;
            }
            ConnectionManager.getInstance().getRepository(UserDetailInfo)
                .createQueryBuilder("UserDetailInfo")
                .where("UserDetailInfo.uid = :uid", { uid: req.body.uid })
                .getOne().then((userDetail) => {

                    res.json(new SuccessModel(0, "获取成功", new Object({ data: userDetail })));
                }, (result) => {

                    res.json(new SuccessModel(0, "获取失败", new Object({ data: result })));
                });

        });

    }
    static editUser = async (req: Request, res: Response) => {

        BaseController.verify(req, res).then((uid) => {

            //do userinfo update 
            const userInfo = new UserDetailInfo();
            userInfo.uid = parseInt(req.params.id, 0);
            userInfo.userName = req.body.user_name;
            userInfo.gender = req.body.gender;
            userInfo.niceName = req.body.nice_name;
            userInfo.realName = req.body.real_name;
            userInfo.age = req.body.age;
            userInfo.birthday = req.body.birthday;
            userInfo.selfSign = req.body.selfsign;
            userInfo.company = req.body.company;
            userInfo.hometown = req.body.hometown;
            userInfo.area = req.body.area;
            userInfo.email = req.body.email;
            userInfo.mobile = req.body.mobile;
            const userRegist = ConnectionManager.getInstance().getRepository(UserDetailInfo)
                .createQueryBuilder("UserDetailInfo")
                .where("UserDetailInfo.uid = :uid", { uid: req.params.id })
                .update(userInfo);
            res.json(new SuccessModel(0, "更新成功", userRegist));
        });

    }
    static delUser = async (req: Request, res: Response) => {
        ;
    }
}
export default UserController
