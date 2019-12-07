import { Request, Response } from "express";
import SuccessModel from '../model/SuccessModel'
import ErrorModel from '../model/ErrorModel'
import { UserDetailInfo } from '../entity/UserDetailInfo';
import { BaseController } from './BaseController';
import { ConnectionManager } from '../utils/ConnectionManager';

class UserFriendsController {

    static addUserFriends = async (req: Request, res: Response) => {

        let label = req.body.label === undefined ? "" : req.body.label
        //Parameter determination
        if (req.body.ufid === undefined ||
            req.body.uid === undefined) {
            res.json(new ErrorModel(202, "非法的请求参数", []))
            return;
        }
        BaseController.verify(req, res).then((uid) => {

            ConnectionManager.getInstance().getRepository(UserDetailInfo)
                .createQueryBuilder("UserDetailInfo")
                .where("UserDetailInfo.uid = :uid", { uid: req.body.ufid })
                .getOne().then((userDetail: any) => {

                    var addUser = `INSERT INTO avchat_user_friends_${req.body.uid} 
                    (uid, nice_name, label, gender, age, header_image)
                    VALUES
                    (${parseInt(req.body.ufid, 0)}, "${userDetail.userName}", 
                    "${label}",${userDetail.gender},
                    ${userDetail.age},"${userDetail.headerImage}"); `;
                    ConnectionManager.getInstance().manager.query(addUser).then((result) => {

                        if (result.affectedRows > 0) {

                            res.json(new SuccessModel(0, "添加成功", {}));

                        } else {
                            res.json(new ErrorModel(221, "添加失败", []))
                        }

                    }, () => {

                        res.json(new ErrorModel(221, "添加失败", []))
                    });

                });
        });

    }
    static allList = async (req: Request, res: Response) => {

        res.json(new ErrorModel(999, "非法请求", []))
    }
    static getUserFriends = async (req: Request, res: Response) => {

        BaseController.verify(req, res).then((uid) => {

            //do  get user friends
            ConnectionManager.getInstance().manager.query(`select * from  avchat_user_friends_${uid}`).then((friends: any) => {

                res.json(new SuccessModel(0, "获取成功", { data: friends }));

            }, () => {

                res.json(new ErrorModel(221, "获取失败", []))

            });
        });

    }
    static editFriends = async (req: Request, res: Response) => {

        //Parameter determination
        if (req.body.label === undefined ||
            req.body.ufid === undefined) {
            res.json(new ErrorModel(202, "非法的请求参数", []))
            return;
        }

        BaseController.verify(req, res).then((uid) => {

            //do  get user friends
            ConnectionManager.getInstance().manager
                .query(`UPDATE avchat_user_friends_${uid} SET label='${req.body.label}' where  uid=${req.body.ufid}`)
                .then((result) => {

                    if (result.affectedRows > 0) {

                        res.json(new SuccessModel(0, "修改成功", {}));

                    } else {

                        res.json(new ErrorModel(221, "修改失败", {}))
                    }

                }, (result) => {
                    res.json(new ErrorModel(221, "修改失败", {}))

                });

        });
    }
    static deleteFriends = async (req: Request, res: Response) => {

        //Parameter determination
        if (req.body.ufid === undefined) {
            res.json(new ErrorModel(202, "非法的请求参数", []))
            return;
        }

        BaseController.verify(req, res).then((uid) => {

            //do  get user friends
            ConnectionManager.getInstance().manager
                .query(`delete from  avchat_user_friends_${uid} where uid=${req.body.ufid}`)
                .then((result: any) => {
                    if (result.affectedRows > 0) {

                        res.json(new SuccessModel(0, "删除成功", {}));

                    } else {

                        res.json(new ErrorModel(221, "删除失败", {}));
                    }

                }, (result: any) => {

                    res.json(new ErrorModel(221, "删除失败", { data: result }));
                });

        });
    }

}
export default UserFriendsController