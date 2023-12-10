const { Comment } = require("../../db");

const deleteComment = async ({id}) => {

   const commentFound = await Comment.findByPk(id)

  if (commentFound) {

    await Comment.update(
      { disabled: true },
      { where: { id } });

    return "comment deleted with success";
  } else {
    return "not found"
  }
};

module.exports= deleteComment