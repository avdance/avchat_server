/*****
 *    avchat routes
 *    optimize routes - TypeScript上 koa  route: 
 *    https://www.jianshu.com/p/e280d916495b
 *    https://www.jianshu.com/p/7893169a7c93
 */
import { Router} from "express";
import login from './Login'
import regist from './Register'
import user from './User'
import friends from './UserFriends'
//add new routes framework  add by guojianyong
const routes = Router();
routes.use('/api/user', user)
routes.use('/api/login', login)
routes.use('/api/regist', regist)
routes.use('/api/friends', friends)

export  default   routes