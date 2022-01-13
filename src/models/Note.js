const mongoose = require('../connection')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: String,
        required: true,
        select: false
    },

    tasks: {
        type: Array,
        required: false
    }
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note