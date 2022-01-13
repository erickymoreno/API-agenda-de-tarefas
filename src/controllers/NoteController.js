const Note = require('../models/Note')

exports.createNote = (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            tasks: req.body.tasks,
            userId: req.userId,
            updatedAt: Date.now()
        })

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

exports.addTask = (req, res) => {
    try {
        const idNote = req.params.idNote
        const task = req.body

        task.createdAt = new Date()
        task.updatedAt = new Date()

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

exports.updateTask = (req, res) => {

    try {
        const idNote = req.params.idNote
        const taskCreatedAt = Date.parse(new Date(req.params.dateCreatedAt))
        const newTask = req.body
        let aux = false

        Note.findById(idNote).then((note) => {
            const tasks = note.tasks

            tasks.forEach((task) => {
                if (Date.parse(task.createdAt) === taskCreatedAt) {

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
        res.send({ message: erro.message})
    }
}