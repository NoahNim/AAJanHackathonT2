const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Comment, Blog, blogLike } = require("../../db/models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all Blogs
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const blogs = await Blog.findAll();
    const blogInfo = [];

    for (let blog of blogs) {
      blog = blog.toJSON();
      const author = await User.findByPk(blog.userId, {
        attributes: ["firstName", "lastName", "profilePicture"],
      });

      const commentCount = await Comment.count({
        where: {
          blogId: blog.id,
        },
      });

      const likeCount = await blogLike.count({
        where: {
          blogId: blog.id,
        },
      });

      blog["user"] = author;
      blog["commentCount"] = commentCount;
      blog["likeCount"] = likeCount;
      blogInfo.push(blog);
    }
    return res.json({ Blogs: blogInfo });
  })
);

// Get details of a Blog from id
router.get("/:blogId", async (req, res, next) => {
  let blogId = req.params.blogId;
  let blog = await Blog.findByPk(blogId);
  if (!blog) {
    const err = new Error("Blog not found");
    err.status = 404;
    err.title = "Blog not found";
    err.errors = ["Blog could not be found"];
    return next(err);
  }

  return res.json(blog);
});

// Create a blog
router.post(
  "/",
  // requireAuth,
  async (req, res, next) => {
    const { title, body, thumbnail, tags } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const newBlog = await Blog.create({
      title,
      body,
      tags,
      thumbnail,
      userId,
    });

    res.status(201);
    return res.json(newBlog);
  }
);

module.exports = router;
