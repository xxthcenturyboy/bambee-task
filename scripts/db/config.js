/* eslint-disable */
var pgUrl2Obj = requre('../src/shared/pgUrl2Object.ts');
var settings = require('../../settings.js');
var configObj = pgUrl2Obj(settings.POSTGRES_URI);

console.log(configObj)

module.exports = {
  development: {
    username: configObj.user,
    password: configObj.password,
    database: configObj.segments[0],
    host: configObj.hostname,
    port: configObj.port || 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: configObj.port || 5432,
    dialect: 'postgres'
  },
  production: {
    username: configObj.user,
    password: configObj.password,
    database: configObj.segments[0],
    host: configObj.hostname,
    port: configObj.port || 5432,
    dialect: 'postgres'
  }
};
