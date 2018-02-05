'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  // POST
  async submit() {
    const res = await this.service.race.saveData(this.ctx.request.body);
    this.ctx.success({ data: res });
  }
}

module.exports = HomeController;
