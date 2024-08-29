const {DataTypes} = require("sequelize");
const sequelize = require('./index').sequelize;
const user = require("./Users");

const ProfileImage = sequelize.define('profileimage',{
    image_name:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

user.hasOne(ProfileImage,{
    OnDelete:"CASCADE",
    OnUpdate:"CASCADE",
});

ProfileImage.belongsTo(user);

module.exports = ProfileImage;