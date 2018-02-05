'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513267952829_8870';

  // add your config here
  config.middleware = [];

  config.errorMongo = {
    details: true,
  };
  config.errorHandler = {
    details: true,
  };

  // mongoose config
  config.mongoose = {
    url: 'mongodb://localhost:27017/ccyd',
    options: {
      useMongoClient: true,
      user: 'root',
      pass: 'Ziyouyanfa#@!',
      authSource: 'admin',
    },
  };

  config.logger = {
    // level: 'DEBUG',
    // consoleLevel: 'DEBUG',
  };

  return config;
};
