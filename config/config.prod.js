'use strict';

module.exports = () => {
  const config = exports = {};

  // mongoose config
  config.mongoose = {
    url: 'mongodb://10.163.150.65:27017/ccyd',
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
