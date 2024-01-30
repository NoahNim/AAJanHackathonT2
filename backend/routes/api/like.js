const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { User } = require("../../db/models");
const router = express.Router();

// Like a blog
router.get('/blog', asyncHandler(async (req, res) => {

    const { userId, blogId } = req.body

    // const blogLike = awai

    return res.json({ userData })
}))

// Like a comment
router.get('/comment', asyncHandler(async () => {

    const { userId, commentId } = req.body


}))

module.exports = router;