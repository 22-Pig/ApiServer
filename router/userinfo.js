const express = require('express')
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_controller = require('../controller/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例
const uploads = multer({ dest: path.join(__dirname, '../static/uploads') })
const avatar = require("../service/avatar")

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_controller.getUserInfo)
// 更新用户信息的路由
// router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_controller.updateUserInfo)
router.post('/userinfo', userinfo_controller.updateUserInfo)
// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_controller.updatePassword)
// 更换头像的路由
// router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_controller.updateAvatar)
// router.post('/update/avatar', uploads.single('avatar'), expressJoi(update_avatar_schema), userinfo_controller.updateAvatar)
router.post('/update/avatar', avatar.multer().single('avatar'), userinfo_controller.updateAvatar)

// 查询所有
router.get("/searchAllUser", userinfo_controller.searchAllUser);


router.get("/validateToken", userinfo_controller.validateToken);
module.exports = router

