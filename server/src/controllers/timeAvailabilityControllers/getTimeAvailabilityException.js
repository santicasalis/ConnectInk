const { TimeAvailability } = require("../../db")

async function getTimeAvailabilityController() {
    const timeAvailability = TimeAvailability.findAll()

    return timeAvailability
}

module.exports = getTimeAvailabilityController