// 设备的处理函数模块
const path = require('path')
const db = require('../db/poolConfig')

const device = require("../dao/device");

module.exports = {
  // 发布设备的处理函数
  addDevice: (req, res) => {
    console.log(req.body)
    // console.log('123');
    // if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('设备图像是必选参数！')

    // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
    // 处理设备的信息对象
    const deviceInfo = {
      // 标题、内容、发布状态、所属分类的Id
      ...req.body,
      // 设备封面的存放路径
      // cover_img: path.join('/uploads', req.file.filename),
      // 设备的发布时间
      install_date: new Date(),
      // 设备作者的Id
      // author_id: req.user.id,
    }
    // console.log(deviceInfo);
    const sql = `insert into device set ?`
    db.connect(sql, deviceInfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增新设备失败！')
      res.cc('新增设备成功！', 0)
    })
  },

  // 删除设备的处理函数
  deleteDeviceById: (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = `update device set is_delete=1 where id=?`
    // 调用 db.connect() 执行 SQL 语句
    db.connect(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('删除设备失败！')
      res.cc('删除设备成功！', 0)
    })
  },

  // 根据 id 更新设备分类的处理函数
  updateDeviceById: (req, res) => {
    // 调用 db.connect() 执行查重的 SQL 语句
    // 定义更新设备分类的 SQL 语句
    const sql = `update device set ? where id=?`
    // 执行更新设备分类的 SQL 语句
    db.connect(sql, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新设备失败！')
      res.cc('更新设备成功！', 0)
    })
  },

  // 根据 id 获取设备数据的处理函数
  getDeviceById: (req, res) => {
    console.log('qwe');
    // 定义根据 ID 获取设备数据的 SQL 语句
    const sql = `select * from device where id=? and is_delete=0`
    // 调用 db.connect() 执行 SQL 语句
    db.connect(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.length !== 1) return res.cc('获取设备数据失败！')
      res.send({
        status: 0,
        message: '获取设备数据成功！',
        data: results[0],
      })
    })
  },
  searchAllDev: (req, resp) => {
    device.searchAllDevDB(function (err, data) {
      if (err) {
        return;
      } else {
        if (data) {
          resp.send(data);
          console.log(data);
        } else {
        }
      }
    });
  }
}