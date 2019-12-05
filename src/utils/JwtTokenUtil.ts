/***
 *   Token Generator
 *   create by  guojianyong  on  2019-12-02
 *   {expressed in seconds or a string describing a time span
 *   [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"...}
 *   https://github.com/zeit/ms    
 *   https://blog.csdn.net/gjy_it/article/details/103355280
 *   * don't install  npm install --save @types/js-base64
 *   * don't install  npm install base-64 --save
 *   npm install --save @types/jsonwebtoken
 *   npm install  jsonwebtoken
 *    
 * ***/
//import { Base64 } from 'js-base64';
import { sign, verify, VerifyCallback } from 'jsonwebtoken';
import { Request, Response } from 'express'
import * as fs from 'fs';
import ErrorModel from '../model/ErrorModel'
// 密钥
const secret = 'AVCHAT'
// 获取签发 JWT 时需要用的密钥
const privateKey = fs.readFileSync('./config/token/private.key')
// 获取验证 JWT 时需要用的公钥
const publicKey = fs.readFileSync('./config/token/public.key')
// private property
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export default class JwTokenUtils {

   static sigin(payload: any): string {

      var options = { expiresIn: '10day' };
      let token = sign(payload, secret, options);
      //let baseToken = this.encode(encodeURIComponent(token));
      //console.log("baseToken="+baseToken);
      return token;

   }

   static siginRs256(payload: any): string {

      var options = {

         expiresIn: '10day',
         algorithm: 'RS256'
      };
      let token = sign(payload, privateKey, options);
      return token;

   }

   static verifyTokenTest(token: string, callback: VerifyCallback): any {

      //let baseToken =  this.decode(token);
      verify(token, secret, callback);
   }

   static verifyToken(req: Request, res: Response): any {

      let result = "";
      //let baseToken =  this.decode(token);
      if (req.originalUrl === '/api/login' ||
         req.originalUrl === '/api/regist') {
         //login url  verify
         //do sometings unlogin take token  verify
         return "true";
      }
      verify(req.body.token, secret, (error: any, decoded: any) => {

         if (error === null) {

            result = decoded;

         } else {

            if (error.message === 'jwt expired') {

               res.json(new ErrorModel(21, error.message, {}));

            } else if (error.message === "invalid token") {

               res.json(new ErrorModel(20, error.message, {}));
            } else if (error.message === "jwt must be provided") {

               res.json(new ErrorModel(201, error.message, {}));
            } else {

               res.json(new ErrorModel(22, error.message, {}));
            }

            result = "";

         }

      });

      return result;
   }

   static verifyRs256(token: string, callback: VerifyCallback): any {

      verify(token, publicKey, callback);
   }

}
