const router = require("express").Router();
const User = require("../../models/Users");
//Use .env for production
const dotenv = require("dotenv").config({ path: "env.example" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");

//Validations
const {
  checkSchema,
  validationResult,
} = require("express-validator");
const {userValidation} = require("../../middlewares/validations");

/**
 * @desc Generate access token
 */
function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

/**
 * @route   POST /users/registration
 * @desc    Register new user
 * @access  Public
 */
router.post(
  "/registration",
  checkSchema(userValidation),
  async (req, res, next) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };

    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(400).json({
        errors: validationError.array(),
      });
    }
    /**
     * Saving to database
     */

    //Hashing password before insertion
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);
      const dbUser = await User.create(user);
      await dbUser.save();

      //jwt token
      let userEmail = user.email;
      const userId = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      const tokenData = {
        id: userId.id,
        email: userId.email,
      };
      const token = generateAccessToken(tokenData);
      return res.status(202).json({ token });
  }
);

/**
 * @route   get /users/:id
 * @desc    Register new user
 * @access  Public
 */
router.get("/:id", async (req, res, next) => {
  let userId = req.params.id;
  const user = await User.findOne({
    where: {
      id: userId,
    },
    attributes: { exclude: ["password"] },
  });
  if (user === null) {
    res.status(404).json({ error: "User does not exist." });
    next();
  } else {
    res.status(202).json(user);
    next();
  }
});

/**
 * @route   post /users/login
 * @desc    Register new user
 * @access  Public
 */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  //Find the user using email with sequelize
  const user = await User.findOne({
    where: {
      email,
    },
  });
  //Compare password from db
  bcrypt.compare(password, user.password, (error, result) => {
    if (result) {
      const tokenData = {
        id: user.id,
        email: user.email,
      };
      const token = generateAccessToken(tokenData);
      res.status(201).json({ token });
    }
    next(error);
  });
});

module.exports = router;
