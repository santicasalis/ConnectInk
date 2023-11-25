const { Router } = require('express')
const customerRouter = Router()
const postCustomerHandler = require('../handlers/CustomerHandlers/postCustomerHandler')
const putCustomerHandler = require('../handlers/CustomerHandlers/updateCustomerHandler')
const deleteCustomerHandler = require('../handlers/CustomerHandlers/deleteCustomerHandler')
const getCustomersHandler = require('../handlers/CustomerHandlers/getCustomersHandler')
const getCustomerByIdHandler = require('../handlers/CustomerHandlers/getCustomerByIdHandler')


customerRouter.get('/', getCustomersHandler)
customerRouter.get('/:id', getCustomerByIdHandler)
customerRouter.post('/', postCustomerHandler)
customerRouter.put('/:id', putCustomerHandler)
customerRouter.put('/delete/:id', deleteCustomerHandler)


module.exports = customerRouter