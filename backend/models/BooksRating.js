const mongoose = require('mongoose');

const bookRatingSchema = mongoose.Schema({
     userId: { type: String, required: true },
     grade: { type:Number, required: true },

});

module.exports = mongoose.model('BookRating', bookRatingSchema);