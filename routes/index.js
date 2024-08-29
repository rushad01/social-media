const router = require("express").Router();

router.use("/api/users",require("./api/Users"));
router.use("/api/posts",require("./api/Posts"));
router.use("/api/profile-image",require("./api/ProfileImage"));

module.exports = router;