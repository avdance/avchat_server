import {Router} from 'express'
import UserFriendsController from '../controller/UserFriendsController'

const router = Router();
/**
 * @route /friends
 * get:  获取所有用户
 * post：创建用户
 */  
router
    .route('/')
    //test Api
    .get(UserFriendsController.allList)
    .post(UserFriendsController.addUserFriends) 

/**
 * @route /friends/:id
 * get:通过id 获取用户
 * put:编辑用户
 * delete:删除用户
 */
router
    .route('/:id')
    .get(UserFriendsController.getUserFriends)
    .put(UserFriendsController.editFriends)
    .delete(UserFriendsController.deleteFriends)

export default router
