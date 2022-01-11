const User = require('../models/User')

exports.register = (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        if (!user.email) {
            res.status(400)
            res.send({ message: "Date is invalid" })
        } else {
            user.save((erro, date) => {
                res.status(201)
                res.send(date)
            })
        }

    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.listAll = (req, res) => {
    try {
        User.find().then((date) => {
            res.status(200)
            res.send(date)
        })
    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}