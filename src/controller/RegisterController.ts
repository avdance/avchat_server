import { getConnection } from "typeorm";
import { Request, Response } from "express";
import SuccessModel from '../model/SuccessModel'
import ErrorModel from '../model/ErrorModel'
import { UserBaseInfo } from '../entity/UserBaseInfo';
import { UserDetailInfo } from '../entity/UserDetailInfo';
import { ConnectionManager } from '../utils/ConnectionManager';
import RedisUtils from '../utils/RedisUtils';
var svgCaptcha = require('svg-captcha');

class RegisterController {

    static regist = async (req: Request, res: Response) => {

        //Parameter determination
        if (req.body.user_name === undefined ||
            req.body.password === undefined ||
            req.body.mobile === undefined ||
            req.body.verify_code === undefined ||
            req.body.nice_name === undefined) {
            res.json(new ErrorModel(202, "非法的请求参数", []))
            return;
        }

        var verifyCode = req.body.verify_code.toLowerCase();

        //图形验证
        RedisUtils.getInstance().getRedisClient().exists(req.body.token, (err1: any, exist: any) => {
            //临时用户不存在
            if (exist === 1 || err1 === null) {

                RedisUtils.getInstance().getRedisClient().get(req.body.token, async (err: any, reply: any) => {
                    //获取注册用户验证码是否通过
                    if (reply === null) {
                        res.json(new ErrorModel(226, "非法验证码", {}));
                        return;
                    }
                    if (err === null && String(verifyCode) === String(reply)) {

                        //判断用户是否存在
                        const userInfo = new UserBaseInfo();
                        userInfo.userName = req.body.user_name;
                        userInfo.password = req.body.password;
                        userInfo.niceName = req.body.nice_name;
                        const userRegist = await ConnectionManager.getInstance().getRepository(UserBaseInfo)
                            .createQueryBuilder("UserBaseInfo")
                            .where("UserBaseInfo.user_name = :user_name", { user_name: req.body.user_name })
                            .getOne();

                        if (userRegist === null || userRegist === undefined) {

                            userInfo.loginStatus = 0;
                            userInfo.createtime = new Date();

                            //make && add  detail table
                            const userDetailInfo = new UserDetailInfo();
                            userDetailInfo.userName = req.body.user_name;
                            userDetailInfo.niceName = req.body.nice_name;
                            userDetailInfo.mobile = req.body.mobile;

                            await getConnection().manager.save(userInfo).then(userBaseInfo => {

                                userDetailInfo.uid = userBaseInfo.uid;

                                getConnection().manager.save(userDetailInfo).then(resolve => {

                                    var createTable = `CREATE TABLE \`avchat_user_friends_${userDetailInfo.uid}\` (
                                    \`uid\` int(10) unsigned NOT NULL COMMENT 'ID' ,
                                    \`nice_name\` varchar(20) NOT NULL COMMENT '好友昵称',
                                    \`label\` varchar(20) NOT NULL COMMENT '好友标签',
                                    \`gender\` int(2) unsigned DEFAULT 0 COMMENT '好友性别', 
                                    \`age\` int(10) unsigned DEFAULT 0 COMMENT '好友年龄',
                                    \`header_image\` varchar(64) DEFAULT NULL COMMENT '好友头像',
                                    PRIMARY KEY (\`uid\`)
                                  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT=\'好友列表\';`;

                                    getConnection().manager.query(createTable).then(() => {

                                        res.json(new SuccessModel(0, "注册成功", {}));

                                    }, (result) => {

                                        //register userDetailInfo fail ,delete  UserBaseInfo 
                                        ConnectionManager.getInstance().getRepository(UserBaseInfo)
                                            .createQueryBuilder("UserBaseInfo")
                                            .where("UserBaseInfo.user_name = :user_name", 
                                                    {user_name: req.body.user_name})
                                            .delete();
                                        res.json(new ErrorModel(221, "注册失败", { data: result }));

                                    });

                                });

                            }, () => {

                                res.json(new ErrorModel(221, "注册失败", {}));
                            });

                        } else {

                            res.json(new ErrorModel(203, "用户已存在", []))
                            return;
                        }

                    } else {

                        res.json(new ErrorModel(226, "验证码错误", {}));
                    }
                });

            } else {

                res.json(new ErrorModel(202, "非法的请求参数", []))
            }

        });
        //error api responese  
    }
    static verify = async (req: Request, res: Response) => {
         /*图形验证*/
        var captcha = svgCaptcha.create({
            inverse: false, // 翻转颜色 
            fontSize: 48, // 字体大小 
            noise: 2, // 噪声线条数 
            width: 100, // 宽度 
            height: 40, // 高度 
            size: 4,// 验证码长度
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        });

        // 保存到session,忽略大小写 
        req.session = captcha.text.toLowerCase();
        //保存到cookie 方便前端调用验证  res.cookie('captcha', req.session); 
        //保存
        RedisUtils.getInstance().set(req.body.token, captcha.text.toLowerCase());
        res.setHeader('Content-Type', 'image/svg+xml');
        res.write(String(captcha.data));
        res.end();

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
export default RegisterController
