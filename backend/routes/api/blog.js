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

module.exports = router;
