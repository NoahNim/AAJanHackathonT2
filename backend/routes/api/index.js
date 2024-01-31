const router = require("express").Router();
const userRouter = require("./user.js");
const blogsRouter = require("./blog.js");
const commentsRouter = require("./comments.js")

router.use("/user", userRouter);
router.use("/blogs", blogsRouter);
router.use("/comments", commentsRouter)

module.exports = router;
