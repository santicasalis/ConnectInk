const {Review} = require("../../db")

async function getReviews(){
    const reviews = Review.findAll()

    return reviews
}

module.exports = getReviews