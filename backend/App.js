const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://hakim1:26632662@cluster0.o4dowfu.mongodb.net/grimoire?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

 
app.use('/api/books', booksRoutes);
app.use('/api/auth' , userRoutes)


module.exports =app;
