const mongoose = require('mongoose');

//Ajout d'une schema de données pour les livres
const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    year :{ type: Number, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    genre: { type: String, required: true },
    ratings : [{
        userId: { type: String, required: true },
        grade: {type: Number , required:true}
     
    }],
    averageRating: { type: Number, required: true },

});

module.exports = mongoose.model('Book', bookSchema);