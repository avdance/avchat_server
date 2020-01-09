import {Router} from 'express'
import RegisterController from '../controller/RegisterController'

const router = Router();
/**
 * @route /register
 * get:  获取所有用户
 * post：创建用户
 */  
router
    .route('/')
    //test Api
    .get(RegisterController.allList)
    .post(RegisterController.regist) 
    router
.route('/verify')
    //test Api
    .post(RegisterController.verify) 
/**
 * @route /register/:id
 * get:通过id 获取用户
 * put:编辑用户
 * delete:删除用户
 */
router
    .route('/:id')
    .get(RegisterController.getOneById)
     //test Api
    .put(RegisterController.editUser)
    .delete(RegisterController.delUser)

export default router
