const router = require("express").Router();
const userRouter = require("./user.js");
const blogsRouter = require("./blog.js");

router.use("/user", userRouter);
router.use("/blogs", blogsRouter);

module.exports = router;
