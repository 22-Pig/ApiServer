const joi = require('joi')

/*  * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则 */


// 分别定义 标题、分类Id、内容、发布状态的校验规则
// const title = joi.string().required()
// const status = joi.string().valid('开启', '关闭').required()
// const describe = joi.string().required().allow('')

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const status = joi.number().integer().valid(1, 0).required()
const category_id = joi.number().integer().min(1).required()
// const value = joi.required()

// 验证规则对象 - 发布设备
exports.add_device_schema = {
  body: {
    id,
    name,
    status,
    category_id,
    // value,
  },
}

exports.delete_device_schema = {
  params: {
    id,
  },
}

exports.update_device_schema = {
  body: {
    id,
    name,
    status,
    category_id,
    // value,
  },
}
exports.get_device_schema = {
  params: {
    id,
  },
}
