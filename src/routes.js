const express = require('express')
const router = express.Router()
const authMeddlewares = require('./middlewares/auth')
const noteController = require('./controllers/NoteController')
const userController = require('./controllers/UserController')

// Routes User
router.post('/register', userController.register) // rota de cadastro
router.post('/login', userController.authenticate)// rota para login
router.get('/user', authMeddlewares, userController.listAll) // rota para testes

// Routes Note
router.get('/note', authMeddlewares, noteController.listAll)
router.post('/note', authMeddlewares, noteController.createNote)
router.get('/note/:idNote', authMeddlewares, noteController.listNoteId)
router.patch('/note/:idNote', authMeddlewares, noteController.updateNote)
router.delete('/note/:idNote', authMeddlewares, noteController.deleteNote)

// Routes task
router.get('/note/:idNote/task', authMeddlewares, noteController.listTasks)
router.post('/note/:idNote/task', authMeddlewares, noteController.addTask)
router.patch('/note/:idNote/task/:idTask', authMeddlewares, noteController.updateTask)
router.delete('/note/:idNote/task/:idTask', authMeddlewares, noteController.deleteTask)

module.exports = router