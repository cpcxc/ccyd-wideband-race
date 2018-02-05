'use strict';

const assert = require('assert');
const Service = require('egg').Service;
const { trimData } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;

// const fields = {
//   dept, name, number, mobile,
//   area, village, building, unit, door,
//   user_name, user_contact, user_mobile, remark};

class RaceService extends Service {

  async saveData({ dept, name, number, mobile,
    area, village, building, unit, door,
    user_name, user_contact, user_mobile, remark }) {

    const { Race: model } = this.ctx.model;
    assert(dept, '部门不能为空');
    assert(name, '姓名不能为空');
    assert(number, '员工编号不能为空');
    assert(mobile, '员工手机号不能为空');
    assert(user_name, '办理人姓名不能为空');
    assert(user_contact, '办理人联系电话不能为空');

    const entity = await model.findOne().or(trimData({ user_contact, user_mobile })).exec();
    if (entity) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '办理人信息已存在');
    }

    const res = await model.create({
      dept, name, number, mobile,
      area, village, building, unit, door,
      user_name, user_contact, user_mobile, remark,
    });
    return res;
  }
}

module.exports = RaceService;
