const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { User, Comment, Blog, blogLike, commentLike } = require("../../db/models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();


router.get('/:blogId', async (req, res) => {
try{
    const blogId = req.params.blogId
    const comments = await Comment.findAll({
        where:{blogId: blogId}, 
        include: [
            {
                model: User,
                attributes:['username']

            },
            {
                model: commentLike,
                attributes: ['id'],
            }

        ]
    });

    if (comments.length === 0 ){
        return res.status(404).json({message: "No comments yet, be the first!" })
    }
    const response = comments.map(comment =>({
        comment: comment.text,
        user:{
            userName: comment.User.username
        },
        likeCount: comment.commentLikes.length
    }))
    res.json(response);

}catch(error){
    res.status(500).send(error.message)
}
})

router.post('/', async (req,res) =>{
    try{
         const { blogId, userId, comment } = req.body;
         const newComment = await Comment.create({ blogId, userId, text: comment });
         res.status(201).json(newComment);
         

    }catch(error){
        res.status(500).send(error.message)
    }
})

