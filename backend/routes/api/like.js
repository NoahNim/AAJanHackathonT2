const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { bloglike, commentlike } = require("../../db/models");
const router = express.Router();

router.get('/blog', asyncHandler(async (req,res) => {

    const res = bloglike.findOne({where:{userId, blogId}})

}))

// Like a blog
router.post('/blog', asyncHandler(async (req, res) => {

    const { userId, blogId } = req.body

    const newLike = await bloglike.create({
        userId,
        blogId
    })

    return {"message": "Successfully liked a blog"}

}))

// Like a comment
router.post('/comment', asyncHandler(async () => {

    const { userId, commentId } = req.body

    const newLike = await commentlike.create({
        userId,
        commentId
    })

    return {"message": "Successfully liked a comment"}

}))

module.exports = router;