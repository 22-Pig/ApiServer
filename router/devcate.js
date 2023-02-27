// 这是设备分类的路由模块
const express = require('express')
const router = express.Router()

// 导入设备分类的路由处理函数模块
const devCate_controller = require('../controller/devcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/devcate')

// 获取设备分类列表数据的路由
router.get('/cates', devCate_controller.getDevCates)
// 新增设备分类的路由
router.post('/addcates', expressJoi(add_cate_schema), devCate_controller.addDeviceCates)
// 根据 id 删除设备分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), devCate_controller.deleteCateById)
// 根据 id 获取设备分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), devCate_controller.getDevCateById)
// 根据 id 更新设备分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), devCate_controller.updateCateById)

module.exports = router
