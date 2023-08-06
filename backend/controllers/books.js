const Book = require("../models/Book");
const fs = require('fs');

exports.createBook = (req,res,next) => {

    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       
    });

   book.save()
        .then(()=>{res.status(201).json({message: 'Livre enregistré'})})
        .catch(error=>{res.status(400).json({error})})



};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
   Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
               Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
exports.deleteBook = (req, res, next) => {
    // Book.deleteOne({ _id: req.params.id })
    //     .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
    //     .catch(error => res.status(400).json({ error }));

    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });

};


exports.getAllBooks = (req, res, next) => {
   
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
        
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getBestRated = (req, res, next) => {
   
  Book.find().sort({ averageRating: 'desc' }).limit(3)
  .then((bestRated) => res.status(200).json(bestRated))
  .catch((error) => res.status(500).json({ error}))

        
};

exports.rateBook = (req, res, next) => {
  const rating = parseFloat(req.body.rating);

  Book.findOne({ _id: req.params.id })
  .then((book) => {
    //check if book exists
      if (!book) {
        return res.status(404).json({ message: "Book not found." });
      }
      //check if book already rated
      const alreadyRated = book.ratings.find(
        (rate) => rate.userId === req.auth.userId
      );

      if(alreadyRated){
        return res.status(400).json({ message: "user already rated this book." });

      }else{

        book.ratings.push({ userId: req.auth.userId, grade: rating });

        let totalRating = 0;
          for (const rating of book.ratings) {
            totalRating += rating.grade;
          }
          book.averageRating = Math.round(totalRating / book.ratings.length);

          book.save()
          .then((updatedBook) => res.status(200).json(updatedBook))
          .catch((error) => res.status(400).json({ error }));
      }



  })
  .catch(error => res.status(500).json({error})); 


  };
  