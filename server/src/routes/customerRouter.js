const { Router } = require('express')
const customerRouter = Router()
const createCustomerHandler = require('../handlers/customerHandlers/createCustomerHandler')
const putCustomerHandler = require('../handlers/customerHandlers/updateCustomerHandler')
const deleteCustomerHandler = require('../handlers/customerHandlers/deleteCustomerHandler')
const getCustomersHandler = require('../handlers/customerHandlers/getCustomersHandler')
const getCustomerByIdHandler = require('../handlers/customerHandlers/getCustomerByIdHandler')


customerRouter.get('/', getCustomersHandler)
customerRouter.get('/:id', getCustomerByIdHandler)
customerRouter.post('/', createCustomerHandler)
customerRouter.put('/:id', putCustomerHandler)
customerRouter.delete('/:id', deleteCustomerHandler)//


module.exports = customerRouter