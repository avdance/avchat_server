import {Router} from 'express'
import UserController from '../controller/UserController'

const router = Router();
/**
 * @route /user
 * get:  获取所有用户
 * post：创建用户
 */  
router
    .route('/')
    //test Api
    .get(UserController.allList)
    .post(UserController.regist) 

/**
 * @route /user/:id
 * get:通过id 获取用户
 * put:编辑用户
 * delete:删除用户
 */
router
    .route('/:id')
    .get(UserController.getUserDetailInfo)
    .put(UserController.editUser)
    .delete(UserController.delUser)

export default router
