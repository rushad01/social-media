const {DataTypes} = require("sequelize");
const sequelize = require('./index').sequelize;
const user = require("./Users");
const post = require("./Post");

const Comment = sequelize.define('comment',{
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

//Relationship
post.hasMany(Comment);
Comment.belongsTo(post);

user.hasMany(Comment);
Comment.belongsTo(user);


module.exports = Comment;