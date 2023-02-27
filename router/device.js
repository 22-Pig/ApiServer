// 设备的路由模块

const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const device_controller = require('../controller/device')

// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_device_schema, delete_device_schema, update_device_schema, get_device_schema } = require('../schema/device')

// 发布设备的路由
// router.post('/add', uploads.single('cover_img'), expressJoi(add_device_schema), device_controller.addDevice)
// router.post('/add', expressJoi(add_device_schema), device_controller.addDevice)
router.post('/add', device_controller.addDevice)


// 根据 id 删除设备的路由
router.get('/deletedevice/:id', expressJoi(delete_device_schema), device_controller.deleteDeviceById)
// 根据 id 更新设备数据的路由
// router.post('/updatedevice', expressJoi(update_device_schema), device_controller.updateDeviceById)
router.post('/updatedevice', device_controller.updateDeviceById)
// 根据 id 获取设备数据的路由
// router.get('/device/:id', expressJoi(get_device_schema), device_controller.getDeviceById)
router.get('/searchDev/:id', device_controller.getDeviceById)


// 查询所有
router.get("/searchAllDev", device_controller.searchAllDev);

module.exports = router
