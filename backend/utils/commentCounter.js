const {Comment} = require('../db/models');

const commentCounter = async(blogId) =>{
    return await Comment.count({
        where: {blogId: blogId}
    })
  
}

module.export = commentCounter

