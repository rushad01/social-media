const dotenv = require("dotenv");

dotenv.config(({path:'.env.example'}))

const dbConfig = {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.MySQL_HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.PORT,
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
};


module.exports = dbConfig;