const User = require("../models/Users");
const Post = require("../models/Post");

/**Registration validation */
const validateUniqueEmail = async (value) => {
  try {
    const existingUser = await User.findOne({ where: { email: value } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
};

const userValidation = {
  first_name: {
    notEmpty: true,
    errorMessage: "First Name cannot be empty.",
  },
  last_name: {
    notEmpty: true,
    errorMessage: "Last Name cannot be empty.",
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Must be a valid email address.",
    },
    custom: {
      options: validateUniqueEmail, // Bind modelName for clarity
      errorMessage: "Email already in use",
    },
  },
};

/** Posts validation for post request */
const postContent = {
  content: {
    notEmpty: true,
    errorMessage: "Content can not be empty.",
  },
};
//update post
const editPost = {
  content: {
    notEmpty: true,
    errorMessage: "Content can not be empty.",
  },
  id: {
    notEmpty: true,
    errorMessage: "User not authorized",
  },
};

//Comment validation
const validatePost = async (value) => {
  try {
    const existingPost = await Post.findOne({ where: { id: value } });
    if (!existingPost) {
      return true;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const commentContent = {
  content: {
    notEmpty: true,
    errorMessage: "Your comment has no content.",
  },
  post_id:{
    notEmpty:false,
    isNumeric:true,
    custom:{
      options:validatePost,
      errorMessage:"Post does't exist or deleted."
    }
  }
};

module.exports = {
  userValidation,
  postContent,
  editPost,
  commentContent,
};
