const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    author: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    year: { type: Number, default: false, required: true },
    read: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
