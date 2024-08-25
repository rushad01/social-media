const {DataTypes} = require("sequelize");
const sequelize = require('./index').sequelize;
const user = require("./Users");

const Post = sequelize.define('post',{
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});
//foreign key for user
user.hasMany(Post);
Post.belongsTo(user);

module.exports = Post;