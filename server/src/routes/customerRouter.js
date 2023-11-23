const { Router } = require('express')
const customerRouter = Router()
const postCustomerHandler = require('../handlers/CustomerHandlers/postCustomerHandler')
const putCustomerHandler = require('../handlers/CustomerHandlers/putCustomerHandler')
const deleteCustomerHandler = require('../handlers/CustomerHandlers/deleteCustomerHandler')
const getCustomersHandler = require('../handlers/CustomerHandlers/getCustomersHandler')

customerRouter.get('/', getCustomersHandler)
customerRouter.post('/create', postCustomerHandler)
customerRouter.put('/:id', putCustomerHandler)
customerRouter.put('/delete/:id', deleteCustomerHandler)


module.exports = customerRouter