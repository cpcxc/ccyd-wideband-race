'use strict';
const Schema = require('mongoose').Schema;

/**
 * 部门（支持下拉选项和模糊搜索）
 * 姓名
 * 员工编号
 * 员工手机号码
 * 用户宽带安装区域（支持下拉选项）
 * 可安装小区名称（支持下拉和模糊搜索）
 **/

/**
 * 1, 如有可安装小区, 如无可安装小区
 * 所在楼栋
 * 单元
 * 门牌号
 * 办理人姓名
 * 办理人联系电话
 * 融合主卡号码
 * 备注
 * 2, 希望开通移动宽带的小区（非必填）
 * 办理人姓名
 * 办理人联系电话
 * 备注
 **/

const SchemaDefine = {
  dept: { type: String, required: true, maxLength: 64 }, // 员工部门
  name: { type: String, required: true, maxLength: 64 }, // 员工姓名
  number: { type: String, required: true, maxLength: 128 }, // 员工编号
  mobile: { type: String, required: true, maxLength: 64 }, // 员工手机号
  area: { type: String, required: true, maxLength: 128 }, // 用户区域
  village: { type: String, required: false, maxLength: 128 }, // 用户小区
  building: { type: String, required: false, maxLength: 128 }, // 用户楼栋
  unit: { type: String, required: false, maxLength: 128 }, // 用户单元
  door: { type: String, required: false, maxLength: 128 }, // 用户门牌号
  user_name: { type: String, required: true, maxLength: 128 }, // 办理人姓名
  user_contact: { type: String, required: true, maxLength: 128 }, // 办理人联系电话
  user_mobile: { type: String, required: false, maxLength: 128 }, // 融合主卡号码
  remark: { type: String, required: false, maxLength: 128 }, // 备注
  create_time: {
    type: Date,
    default: new Date(),
  },
};

const schema = new Schema(SchemaDefine);
schema.index({ user_contact: 1 }, { unique: true });
schema.index({ user_mobile: 1 }, { unique: false });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Race', schema, 'ccyd_wideband_race');
};
