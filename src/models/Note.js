const mongoose = require('../connection')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedAt:{
        type: Date,
        required: false
    },
    task:{
        type: Array,
        required: false
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note