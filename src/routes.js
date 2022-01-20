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
router.get('/note', authMeddlewares, noteController.listAll)// rota para listar todas as notas
router.post('/note', authMeddlewares, noteController.createNote)// rota para criar novas notas
router.get('/note/:idNote', authMeddlewares, noteController.listNoteId)// rota para listar nota pelo id
router.put('/note/:idNote', authMeddlewares, noteController.updateNote)// rota para atualizar nota
router.delete('/note/:idNote', authMeddlewares, noteController.deleteNote)// rota para deletar nota

// Routes task
router.get('/note/:idNote/task', authMeddlewares, noteController.listTasks)// rota para listar as tasks de uma nota
router.post('/note/:idNote/task', authMeddlewares, noteController.addTask)// rota para adicionar nova task
router.put('/note/:idNote/task/:idTask', authMeddlewares, noteController.updateTask)// rota para atualizar uma task
router.delete('/note/:idNote/task/:idTask', authMeddlewares, noteController.deleteTask)// rota para deletar uma task

module.exports = router