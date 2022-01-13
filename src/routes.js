const express = require('express')
const router = express.Router()
const authMeddlewares = require('./middlewares/auth')
const noteController = require('./controllers/NoteController')
const userController = require('./controllers/UserController')

// routes User
router.post('/register', userController.register) // rota de cadastro
router.post('/login', userController.authenticate)// rota para login
router.get('/user', authMeddlewares, userController.listAll) // rota para testes

// routes Note
router.get('/note', authMeddlewares, noteController.listAll)
router.post('/note', authMeddlewares, noteController.createNote)
router.get('/note/:idNote', authMeddlewares, noteController.listTasks)
router.post('/note/:idNote', authMeddlewares, noteController.addTask)
router.patch('/note/:idNote', authMeddlewares, noteController.updateNote)
router.patch('/note/:idNote/:dateCreatedAt', authMeddlewares, noteController.updateTask)
router.delete('/note/:idNote', authMeddlewares, noteController.deleteNote)
router.delete('/note/:idNote/:dateCreatedAt', authMeddlewares, noteController.deleteTask)


module.exports = router