// 导入数据库操作模块
const db = require('../db/poolConfig')

module.exports = {

    searchAllUserDB(arr, cb) {
        const sql = "SELECT * FROM user";
        db.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },


    addUserDB(arr, cb) {
        const sql = "INSERT INTO user VALUES (?,?,?,?)";
        console.log(arr);
        db.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    deleteUserDB(arr, cb) {
        let sql = "DELETE FROM user WHERE username = ?";
        db.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    updateUserDB(arr, cb) {
        const sql = "UPDATE user SET id = ?, password = ?, message = ? WHERE username = ?";
        db.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    searchUserDB(arr, cb) {
        const sql = "SELECT * FROM user WHERE username = ?";
        db.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },

}