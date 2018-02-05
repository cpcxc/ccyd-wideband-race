'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/submit', controller.home.submit);
  router.post('/admin/login', controller.admin.login);
  router.post('/admin/query', controller.admin.query);
  router.get('/admin/exportXlsx', controller.admin.exportXlsx);
};
