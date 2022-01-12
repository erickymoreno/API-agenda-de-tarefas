const Note = require('../models/Note')

exports.createNote = (req, res) => {
    try{
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
    } catch(erro){
        res.status(500)
        res.send({ message: erro.message})
    }
}

exports.listAll = (req, res) => {
    try {
        
        const userId = req.userId

        Note.find({ userId: userId}).then((date) => {
    
            if(date == false){
                res.status(404)
                res.send({ message: "Not Found" })
            } else {
                res.status(200)
                res.send(date)
            }
        })

    } catch (error) {
        res.status(500)
        res.send({ message: message.erro})
    }
}