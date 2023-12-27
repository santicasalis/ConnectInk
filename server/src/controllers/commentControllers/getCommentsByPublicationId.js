const { Comment,Customer  } = require("../../db");

const getCommentsBypublicationId = async ({publicationId}) => {

    const comments = await Comment.findAll({
        where:{
            Publication_Comment: publicationId,
            disabled: false
        },
        include: [
            {
                model: Customer,
                as:'customer',
                attributes:['fullName', 'image']
            }
        ]
    })
    
    return {
        code: 201,
        data: comments
    }
}

module.exports= getCommentsBypublicationId