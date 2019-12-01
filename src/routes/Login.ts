import {Router} from 'express'
import LoginController from '../controller/LoginController'

const router = Router();
/**
 * @route /login
 * get:  获取所有用户
 * post：创建用户
 */  
router
    .route('/')
    //test Api
    .get(LoginController.allList)
    .post(LoginController.login) 

/**
 * @route /login/:id
 * get:通过id 获取用户
 * put:编辑用户
 * delete:删除用户
 */
router
    .route('/:id')
    .get(LoginController.getOneById)
     //test Api
    .put(LoginController.editUser)
    .delete(LoginController.delUser)

export default router
