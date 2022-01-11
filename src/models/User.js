const mongoose = require('../connection')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})

UserSchema.pre('save', async function(next){
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword

    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User