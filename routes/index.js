const router = require("express").Router();

router.use("/api/users",require("./api/Users"));
router.use("/api/posts",require("./api/Posts"));

module.exports = router;