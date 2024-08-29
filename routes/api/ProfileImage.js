const router = require("express").Router();
const ProfileImage = require("../../models/ProfileImage");
//Use .env for production
const authenticationToken = require("../../middlewares/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const rootDir = path.join(__dirname, "../..");

/*
 * file upload middleware
 */
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/");
  },
  filename: (req, file, callback) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("_") +
      "_" +
      Date.now();
    callback(null, fileName + fileExt);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

/**
 * @route   POST /
 * @desc    Add profile Image
 * @access  Authenticated User
 */

router.post(
  "/new",
  [authenticationToken, upload.single("profile_img")],
  async (req, res) => {
    const { user } = req.user;
    //destructuring for nested object from token
    const { id, email } = user;
    console.log(req.file.filename);
    const avatar = await ProfileImage.create({
      userId: id,
      image_name: req.file.filename,
    });
    if (avatar === null) {
      fs.unlink(`public/uploads/${req.file.filename}`, (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
      });
    }

    res.status(200).json({ message: "Successfully uploaded." });
  }
);

module.exports = router;
