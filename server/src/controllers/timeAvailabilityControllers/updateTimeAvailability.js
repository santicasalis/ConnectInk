const { TimeAvailability } = require('../../db')

const updateTimeAvailability = async (id, date, initialHour, finalHour) => {
    const timeAvailabilityFound = await TimeAvailability.findByPk(id)

    if (timeAvailabilityFound) {
        await TimeAvailability.update(
            {
                date: date,
                initialHour: initialHour, 
                finalHour: finalHour
            },
            {
                where: { id: id }
            }
        )
        return 'Update sucessful'
    } else {
        return 'Time availability not found'
    }
}

module.exports = updateTimeAvailability