const mongoose = require('mongoose')

const shortURL = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    hitcount: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("shortURL", shortURL)