'use strict';
const Schema = require('mongoose').Schema;

const SchemaDefine = {
  username: { type: String, required: true, maxLength: 64 },
  password: { type: String, required: true, maxLength: 128 },
  remark: { type: String, required: false, maxLength: 128 },
};

const schema = new Schema(SchemaDefine);

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('Admin', schema, 'ccyd_wideband_admin');
};
