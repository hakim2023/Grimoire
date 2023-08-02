const mongoose = require('mongoose');

const booksRatingSchema = mongoose.Schema({
     userId: { type: String, required: true },
     grade: { type:Number, required: true },

});

module.exports = mongoose.model('BooksRating', booksRatingSchema);