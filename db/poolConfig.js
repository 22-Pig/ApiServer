const mysql = require("mysql");

// 创建数据库连接对象
const poolConfig = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123123",
    database: "cabinet"
}

const dbPool = {
    pool: {},

    create() {
        // 创建连接池对象
        this.pool = mysql.createPool(poolConfig);
    },
    connect(sql, arr, fun) {
        // 通过连接池对象连接MySQL
        this.pool.getConnection(function (err, connection) {
            // console.log(sql);
            connection.query(sql, arr, fun);
            connection.release(); // 释放该连接
        });
    }
}

dbPool.create();
// 向外共享 db 数据库连接对象
module.exports = dbPool;