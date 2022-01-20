const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(params = {}){
    return jwt.sign(params, process.env.SECRET_KEY,{
        expiresIn: 82800
    })
}

exports.register = (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        if (!user) {
            res.status(400)
            res.send({ message: "Date invalid" })
        } else {
            user.save((erro, date) => {
                res.status(201)
                res.send({date, token: generateToken({id: user.id})})
            })
        }

    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.authenticate = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ email: email }).select('+password')

        if (!user) {
            res.status(400)
            res.send({ message: "User not found" })
        }

        if (!await bcrypt.compare(password, user.password)) {
            res.status(400)
            res.send({ message: "Invalid password" })
        }

        user.password = undefined
        
        res.send({user, token: generateToken({id: user.id})})

    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

exports.listAll = (req, res) => {
    try {
        User.find().then((date) => {
            res.status(200)
            res.send({date: date, id: req.userId})
        })
    } catch (erro) {
        res.status(500)
        res.send({ message: erro.message })
    }
}

