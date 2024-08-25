const router = require("express").Router();
const Post = require("../../models/Post");
const authenticationToken = require("../../middlewares/auth");
const Users = require("../../models/Users");
const { where } = require("sequelize");
const { postContent, editPost } = require("../../middlewares/validations");
const { checkSchema, validationResult } = require("express-validator");

/**
 * @route   post /post
 * @desc    Create new post
 * @access  Authenticated User
 */
router.post(
  "/post",
  [authenticationToken, checkSchema(postContent)],
  async (req, res, next) => {
    const { content } = req.body;
    //If the token verification is successfull from middlewares
    const { user } = req.user;
    //destructuring for nested object from token
    const { id, email } = user;
    //validation
    const postValidationError = validationResult(req);
    if (!postValidationError.isEmpty()) {
      return res.status(404).json({ errors: postValidationError.array() });
    }
    const post = await Post.create({
      content,
      userId: id,
    });
    return res.status(201).json({ post });
  }
);

/**
 * @route   get /offset & limit
 * @desc    See a single post
 * @access  Public Route
 */
router.get("/", async (req, res, next) => {
  const paramOffset = parseInt(req.query.offset);
  const paramLimit = parseInt(req.query.limit);
  const posts = await Post.findAll({
    include: [{ model: Users, attributes: ["first_name", "last_name"] }],
    offset: paramOffset > 0 ? paramOffset : 0,
    limit: paramLimit > 0 ? paramLimit : 20,
  });

  if (posts === null) {
    res.status(201).json({ message: "No post found." });
    next();
  }
  res.status(201).json({ posts });
  next();
});

/**
 * @route   get /
 * @desc    See a all post
 * @access  Public Route
 */
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  //One to many relationship:a user has many post
  const post = await Post.findByPk(postId, {
    include: [
      {
        model: Users,
        attributes: ["first_name", "last_name"],
      },
    ],
  });
  if (post === null) {
    return res.status(201).json({ message: "No post found" });
  }
  return res.status(201).json({ post });
});

/**
 * @route   post /
 * @desc    Save an edited post
 * @access  Public Route
 */
router.post(
  "/:id",
  [authenticationToken, checkSchema(editPost)],
  async (req, res, next) => {
    //getting user info fromm token
    const { user } = req.user;
    const { id, email } = user;
    const reqId = req.body.id;
    if (id !== reqId) {
      return res
        .status(401)
        .json({ errors: "You are not authorized to edit this post" });
    }
    //validation
    const postValidationError = validationResult(req);
    if (!postValidationError.isEmpty()) {
      return res.status(401).json({ errors: postValidationError.array() });
    }
    const updatedPost = {
      content: req.body.content,
      updatedAt: new Date(),
    };

    const post = await Post.update(
      { content: updatedPost.content, updatedAt: updatedPost.updatedAt },
      {
        where: {
          userId: reqId,
        },
      }
    );

    res.status(201).json({ message: "Post updated successfully." });
    next();
  }
);

/**
 * @route   delete /
 * @desc    Delete a post
 * @access  Authenticated user
 */
router.delete("/:id", authenticationToken, async (req, res, next) => {
  //getting user info fromm token
  const { user } = req.user;
  const { id, email } = user;
  const postId = req.params.id;
  const post = await Post.findOne({
    where: {
      userId: id,
      id: postId,
    },
  });

  if (post === null) {
    res.status(201).json({ message: "Post not found" });
    next();
  }
  await Post.destroy({
    where: {
      id: post.id,
    },
  });
  res.status(201).json({ message: "Post deleted successfully." });
});

module.exports = router;
