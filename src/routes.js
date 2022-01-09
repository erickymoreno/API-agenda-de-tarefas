const express = require('express')
const router = express.Router()

const tasksController = require('./controllers/NoteController')


router.get('/', tasksController.lista)


module.exports = router