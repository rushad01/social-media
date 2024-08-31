const router = require("express").Router();
const ProfileImage = require("../../models/ProfileImage");
//Use .env for production
const authenticationToken = require("../../middlewares/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { where } = require("sequelize");

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
          return res.status(404).json({ error: err });
        }
      });
    }

    res.status(202).json({ message: "Successfully uploaded." });
  }
);

/**
 * @route   GET /avatar
 * @desc    Current profile pic of the user
 * @access  Public
 */
router.get("/avatar", async (req, res) => {
  const id = req.body.id;
  const avatar = await ProfileImage.findOne({
    where: {
      userId: id,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  if (avatar === null) {
    return res.status(404).json({ message: "You have no profile image" });
  }

  const filepath = `http://${req.headers.host}/uploads/${avatar.image_name}`;
  const avatarProperty = {
    image_id: avatar.id,
    image_path: filepath,
    userId: avatar.userId,
  };
  return res.status(202).json({ avatarProperty });
});

/**
 * @route   DELETE /avatarID
 * @desc    Current profile pic of the user
 * @access  Authenticated
 */
router.delete("/:id", authenticationToken, async (req, res) => {
  const { user } = req.user;
  //destructuring for nested object from token
  const { id, email } = user;
  const avatarId = req.params.id;
  const avatar = await ProfileImage.findOne({
    where: {
      id: avatarId,
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if(avatar.userId !== id){
    return res.status(401).json({error:"You don't have permission to delete this profile image."});
  }
  await avatar.destroy();
  fs.unlink(`public/uploads/${avatar.image_name}`, (err) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
  });

  res.status(202).json({message:"Profile picture deleted Successfully"});

});
module.exports = router;
