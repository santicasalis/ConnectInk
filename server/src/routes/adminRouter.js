const { Router } = require('express')
const adminRouter = Router()
const createAdminHandler = require('../handlers/adminHandlers/createAdminHandler')
const updateAdminHandler = require('../handlers/adminHandlers/updateAdminHandler')
const deleteAdminHandler = require('../handlers/adminHandlers/deleteAdminHandler')
const getAdminsHandler = require('../handlers/adminHandlers/getAdminsHandler')
const getAdminByIdHandler = require('../handlers/adminHandlers/getAdminByIdHandler')


adminRouter.get('/', getAdminsHandler)
adminRouter.get('/:id', getAdminByIdHandler)
adminRouter.post('/', createAdminHandler)
adminRouter.put('/:id', updateAdminHandler)
adminRouter.delete('/:id', deleteAdminHandler)


module.exports = adminRouter