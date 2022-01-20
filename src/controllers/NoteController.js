const Note = require('../models/Note')
const { v4: uuidv4 } = require('uuid')

exports.createNote = (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            userId: req.userId,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        const tasks = req.body.tasks
        tasks.forEach(task => {
            task.id = uuidv4()
            task.createdAt = new Date(Date.now())
            task.updatedAt = new Date()
        })

        note.tasks = tasks

        if (!note) {
            res.status(400)
            res.send({ message: "Date invalid" })
        } else {
            note.save((erro) => {
                res.status(201)
                res.send(note)
            })
        }
    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.listAll = (req, res) => {
    try {

        const userId = req.userId

        Note.find({ userId: userId }).then((date) => {

            if (date == false) {
                res.status(404)
                res.send({ message: "Not Found" })
            } else {
                res.status(200)
                res.send(date)
            }
        })

    } catch (error) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.listNoteId = (req, res) => {
    try {
        const idNote = req.params.idNote

        Note.findById(idNote, (erro, note) => {

            if (erro) {
                res.status(404)
                res.send({ message: "Note not found" })
            } else {
                res.status(200)
                res.send(note)
            }
        })
    } catch (error) {
        res.status(500)
        res.send({ message: error.message })
    }
}

exports.updateNote = (req, res) => {
    try {
        const idNote = req.params.idNote
        const note = req.body

        note.updatedAt = new Date()

        Note.findByIdAndUpdate(idNote, note).then((note) => {
            if (note == false) {
                res.status(404)
                res.send({ message: "Note invalid" })
            } else {
                res.status(200)
                res.send(note)
            }
        })

    } catch (error) {
        res.status(500)
        res.send({ message: error.message })
    }
}

exports.deleteNote = (req, res) => {
    try {
        const idNote = req.params.idNote

        Note.findByIdAndDelete(idNote).then((note) => {
            if (note) {
                res.status(200)
                res.send({ message: "Note successfully deleted" })
            } else {
                res.status(404)
                res.send({ message: "Note not found" })
            }
        })
    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.addTask = (req, res) => {
    try {
        const idNote = req.params.idNote
        const task = req.body

        task.createdAt = new Date()
        task.updatedAt = new Date()
        task.id = uuidv4()

        Note.findById(idNote).then((note) => {

            if (note == false) {
                res.status(404)
                res.send({ message: 'Note not found' })
            } else {

                note.tasks.push(task)

                note.save((erro) => {
                    res.status(201)
                    res.send(task)
                })
            }
        })
    } catch (error) {
        res.status(500)
        res.send({ message: error.message })
    }
}

exports.listTasks = (req, res) => {
    try {
        const idNote = req.params.idNote

        Note.findById(idNote).then((date) => {
            if (date == false) {
                res.status(404)
                res.send({ message: 'Not Found' })
            } else {
                res.status(200)
                res.send(date.tasks)
            }
        })

    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.updateTask = (req, res) => {

    try {
        const idNote = req.params.idNote
        const idTask = req.params.idTask
        const newTask = req.body
        let aux = false

        Note.findById(idNote).then((note) => {
            const tasks = note.tasks

            tasks.forEach((task) => {
                if (task.id === idTask) {

                    if (task.title != newTask.title && newTask.title != undefined) { task.title = newTask.title }

                    if (task.taskRelevance != newTask.taskRelevance && newTask.taskRelevance != undefined) { task.taskRelevance = newTask.taskRelevance }

                    if (task.completed != newTask.completed && newTask.completed != undefined) { task.completed = newTask.completed }
                    task.updatedAt = new Date()

                    Note.findByIdAndUpdate(idNote, note).then(() => {
                        Note.findById(idNote).then((note) => {
                            res.status(200)
                            res.send(note)
                        })
                    })

                    aux = true
                }
            })
        }).then(() => {
            if (aux === false) {
                res.status(404)
                res.send({ message: 'Task Not Found' })
            }
        })

    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.deleteTask = (req, res) => {
    try {
        const idNote = req.params.idNote
        const idTask = req.params.idTask
        let aux = false

        Note.findById(idNote, (erro, note) => {
            if (erro) {
                res.status(404)
                res.send({ message: "Note not found" })
            } else {
                const tasks = note.tasks
                tasks.forEach((task) => {

                    if (task.id === idTask) {
                        const index = tasks.findIndex((task) => task.id === idTask)
                        tasks.splice(index)

                        Note.findByIdAndUpdate(idNote, note).then(() => {
                            Note.findById(idNote).then((note) => {
                                res.status(200)
                                res.send(note)
                            })
                        })

                        aux = true
                    }
                })
                if (aux === false) {
                    res.status(404)
                    res.send({ message: 'Task Not Found' })
                }
            }
        })

    } catch (erro) {
        res.send(500)
        res.send({ message: erro.message })
    }
}