const { Comment } = require("../../db");

const getCommentsBypublicationId = async ({publicationId}) => {

    const comments = await Comment.findAll({where:{
        Publication_Comment: publicationId,
        disabled: false
    }})
    
    return {
        code: 201,
        data: comments
    }
}

module.exports= getCommentsBypublicationId