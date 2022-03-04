const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const veterinarySchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 50,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    token: {
        type: String
    }
})

const Veterinary = mongoose.model("Veterinary", veterinarySchema)
module.exports = Veterinary