const jwt = require('jsonwebtoken');	//引入jwt包
const jwtSecretKey = 'shaun5297'
let tokenStr = ''

let encrypt = (data, time) => {
    tokenStr = jwt.sign(data, jwtSecretKey, { expiresIn: time });
    return tokenStr;
}


let decrypt = (token) => {
    /**
     * @name: 解密函数
     * @param {*token:  要解密的token}
     * @return {
     *    *id:  用户id，便于其他接口使用
     *    *token: 用于作为判断token是否过期或者有效的标识
     * }
     */

    try {
        let data = jwt.verify(token, jwtSecretKey);
        return {
            gadID: data.gadID,
            token: true
        }
    } catch (err) {
        return {
            gadID: err,
            token: false
        }
    }
}

module.exports = {	//将这两个加密函数和解密函数导出去
    encrypt,
    decrypt,
    tokenStr
}
