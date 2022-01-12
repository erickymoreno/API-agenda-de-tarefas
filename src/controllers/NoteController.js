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
        task.updateAt = new Date()
        
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