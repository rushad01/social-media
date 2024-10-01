const Comment = require("../../models/Comment");
const authenticationToken = require("../../middlewares/auth");
const { commentContent } = require("../../middlewares/validations");
const { checkSchema, validationResult } = require("express-validator");
const router = require("express").Router();

/**
 * @route   comment /comment
 * @desc    Create new comment
 * @access  Authenticated User
 */
router.post("/comment",authenticationToken,async(req,res)=>{
    const result = await checkSchema(commentContent).run(req);
    const { content,post_id } = req.body;
    //If the token verification is successfull from middlewares
    const { user } = req.user;
    //destructuring for nested object from token
    const { id, email } = user;

    const commentValidationError = validationResult(req);
    if (!commentValidationError.isEmpty()) {
      return res.status(422).json({ errors: commentValidationError.array() });
    }

    const comment = await Comment.create({content:content,userId:id,postId:post_id});
    res.status(201).json({comment});
})

module.exports = router;