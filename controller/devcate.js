// 导入数据库操作模块
const db = require('../db/poolConfig')

module.exports = {
  // 获取设备分类列表的处理函数
  getDevCates: (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const sql = `select * from device_category where is_delete=0 order by id asc`
    // 调用 db.connect() 执行 SQL 语句
    db.connect(sql, (err, results) => {
      if (err) return res.cc(err)
      res.send({
        status: 0,
        message: '获取设备分类数据成功！',
        data: results,
      })
    })
  },

  // 新增设备分类的处理函数
  addDeviceCates: (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = `select * from device_category where name=? or alias=?`
    // 2. 执行查重的 SQL 语句
    db.connect(sql, [req.body.name, req.body.alias], (err, results) => {
      // 3. 判断是否执行 SQL 语句失败
      if (err) return res.cc(err)

      // 4.1 判断数据的 length
      if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
      // 4.2 length 等于 1 的三种情况
      if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
      if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

      // 定义插入设备分类的 SQL 语句
      const sql = `insert into device_category set ?`
      // 执行插入设备分类的 SQL 语句
      db.connect(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增设备分类失败！')
        res.cc('新增设备分类成功！', 0)
      })
    })
  },

  // 删除设备分类的处理函数
  deleteCateById: (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = `update device_category set is_delete=1 where id=?`
    // 调用 db.connect() 执行 SQL 语句
    db.connect(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('删除设备分类失败！')
      res.cc('删除设备分类成功！', 0)
    })
  },

  // 根据 id 获取设备分类的处理函数
  getDevCateById: (req, res) => {
    // 定义根据 ID 获取设备分类数据的 SQL 语句
    const sql = `select * from device_category where id=? and is_delete=0`
    // 调用 db.connect() 执行 SQL 语句
    db.connect(sql, req.params.id, (err, results) => {
      if (err) return res.cc(err)
      if (results.length !== 1) return res.cc('获取设备分类数据失败！')
      res.send({
        status: 0,
        message: '获取设备分类数据成功！',
        data: results[0],
      })
    })
  },

  // 根据 id 更新设备分类的处理函数
  updateCateById: (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from device_category where id<>? and (name=? or alias=?)`
    // 调用 db.connect() 执行查重的 SQL 语句
    db.connect(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)

      // 判断名称和别名被占用的4种情况
      if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
      if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
      if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

      // 定义更新设备分类的 SQL 语句
      const sql = `update device_category set ? where id=?`
      // 执行更新设备分类的 SQL 语句
      db.connect(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新设备分类失败！')
        res.cc('更新设备分类成功！', 0)
      })
    })
  },
}
