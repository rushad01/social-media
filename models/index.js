const dbConfig = require('../config/mysql')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database,dbConfig.user,dbConfig.password,{
    host:dbConfig.host,
    port:dbConfig.port,
    dialect:"mysql",
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;