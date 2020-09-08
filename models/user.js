const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 555,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 555,
        min: 6
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true,
        max: 255,
        min: 1
    },
    lastName: {
        type: String,
        required: true,
        max: 255,
        min: 1
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    isVerified:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('User', UserSchema)
