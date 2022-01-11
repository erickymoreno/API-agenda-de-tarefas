const express = require('express')
const router = express.Router()

const noteController = require('./controllers/NoteController')
const userController = require('./controllers/UserController')

// routes User
router.post('/user', userController.register)
router.get('/user', userController.listAll)


// routes note
router.get('/notes', noteController.lista)


module.exports = router