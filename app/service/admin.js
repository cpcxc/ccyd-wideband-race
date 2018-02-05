'use strict';

const assert = require('assert');
const Service = require('egg').Service;
const { trimData } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;

const { sep } = require('path');
const moment = require('moment');
const iconv = require('iconv-lite');
const fs = require('fs');
const xlsx = require('xlsx');

moment.locale('zh-cn');

const fields = [
  [ 'dept', '员工部门' ],
  [ 'name', '员工姓名' ],
  [ 'number', '员工编号' ],
  [ 'mobile', '员工手机号' ],
  [ 'area', '用户区域' ],
  [ 'village', '用户小区' ],
  [ 'building', '用户楼栋' ],
  [ 'csrq', '出生日期' ],
  [ 'unit', '用户单元' ],
  [ 'door', '用户门牌号' ],
  [ 'user_name', '办理人姓名' ],
  [ 'user_contact', '办理人联系电话' ],
  [ 'user_mobile', '融合主卡号码' ],
  [ 'remark', '备注' ],
];

class AdminService extends Service {
  async login({ username, password }) {
    assert(username, '用户名不能为空');
    const { Admin: model } = this.ctx.model;
    const entity = await model.findOne({ username }).exec();
    if (!entity) {
      throw new BusinessError(ErrorCode.USER_NOT_EXIST);
    }
    if (entity.password !== password) {
      throw new BusinessError(ErrorCode.BAD_PASSWORD);
    }
    return 'ok';
  }

  async query({ page, size, field, value, start, end }) {
    assert(page > 0, '参数page无效');
    assert(size > 0, '参数size无效');
    assert(/\d{8}/.test(start), '参数start无效');
    assert(/\d{8}/.test(end), '参数start无效');
    const { Race: model } = this.ctx.model;

    let offset = 0;
    const filter = {};
    if (field && value) {
      filter[field] = value;
    }
    if (start && end) {
      filter.create_time = {
        $gt: moment(start, 'YYYYMMDD').toDate(),
        $lt: moment(end, 'YYYYMMDD').add(1, 'days').toDate(),
      };
    }
    console.log(filter);
    if (page && size) offset = (page - 1) * size;
    const total = await model.count(filter).exec();
    const res = await model.find(filter).sort({ create_time: 1 })
      .skip(offset)
      .limit(Number(size))
      .exec();
    // console.log(res);

    // res = res.map((p, i) => ({ ...p, bh: `${(10001 + offset + i).toString().substr(1)}` }));
    return { data: res, total };
  }

  async exportXlsx({ field, value, start, end }) {
    assert(/\d{8}/.test(start), '参数start无效');
    assert(/\d{8}/.test(end), '参数start无效');
    const { Race: model } = this.ctx.model;
    const { app } = this;
    const name = moment().format('YYYYMMDDHHmmss') + '.xlsx';
    const path = `${app.baseDir}${sep}export${sep}`;

    const filter = {};
    if (field && value) {
      filter[field] = value;
    }
    if (start && end) {
      filter.create_time = {
        $gt: moment(start, 'YYYYMMDD').toDate(),
        $lt: moment(end, 'YYYYMMDD').add(1, 'days').toDate(),
      };
    }
    console.log(filter);
    let rs = await model.find(filter).sort({ create_time: 1 }).exec();
    rs = rs.map(r => fields.reduce(
      (p, c) => ({
        ...p,
        [c[1]]: r[c[0]],
      }), { }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(rs);
    xlsx.utils.book_append_sheet(wb, ws);
    xlsx.writeFile(wb, path + name);
    return { path, name };
  }
}

module.exports = AdminService;
