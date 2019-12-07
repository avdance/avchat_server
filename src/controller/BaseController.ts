import { Request, Response } from "express";
import ErrorModel from '../model/ErrorModel'
import { UserBaseInfo } from '../entity/UserBaseInfo';
import JwTokenUtils from '../utils/JwtTokenUtil';
import {ConnectionManager} from '../utils/ConnectionManager';

export class BaseController {

    public static async verify(req: Request, res: Response) {

        let result = JwTokenUtils.verifyToken(req, res);
        const useSelect = await ConnectionManager.getInstance().getRepository(UserBaseInfo)
            .createQueryBuilder("UserBaseInfo")
            .where("UserBaseInfo.user_name = :user_name", { user_name: result.iss })
            .getOne();

        if (useSelect === null || useSelect === undefined) {

            res.json(new ErrorModel(999, "非法请求", []))
        } else {

            if ( useSelect.uid === parseInt(req.params.id, 0) ||  useSelect.uid === parseInt(req.body.uid, 0) ) {

                return new Promise((resolve, reject) => {
                    resolve(useSelect.uid); //这里调resolve方法，则then方法会被调用
                })

            } else {

                res.json(new ErrorModel(999, "非法请求", []))
            }

        }

    }

}