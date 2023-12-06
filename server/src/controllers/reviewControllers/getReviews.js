const {Review} = require("../../db")

async function getReviews(){
    const reviews = Review.findAll({ where: { disabled: false } })

    return reviews
}

module.exports = getReviews