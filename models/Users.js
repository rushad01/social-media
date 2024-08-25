const {DataTypes} = require("sequelize");
const sequelize = require('./index').sequelize;

const Users = sequelize.define("users",{
    first_name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[8,70],
        }
    }
});

module.exports = Users;