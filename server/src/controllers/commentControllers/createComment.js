const { Customer, Publication, Comment } = require("../../db");

const createComment = async ({customerId, publicationId, text}) => {

    //chequea que exista la publicacion
    const publication = await Publication.findByPk(publicationId);
    if (publication === null) {
        return { code: 404, error: "publication not found" };
    }

    //chequea que exista el cliente
    const customer = await Customer.findByPk(customerId);
    if (customer === null) {
        return { code: 404, error: "Customer not found" };
    }

    const comment = await Comment.create({ 
        text,
        Publication_Comment: publicationId,
        Customer_Comment: customerId
     });


    return {
        code: 201,
        message: "Comment created successfully",
        data: comment,
      };
};

module.exports = createComment;
