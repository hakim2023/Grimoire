const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const secretToken = process.env.SECRET_TOKEN;

exports.signUp = (req , res, next) => {
 //on sale  le mot de passe 10 fois   
bcrypt.hash(req.body.password , 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        });
        user.save()
            .then(() => res.status(201).json({message : 'user created'}))
            .catch(error =>res.status(400).json({error}))
    })

    .catch(error => res.status(500).json({error}))
};

exports.login = (req , res , next) => {
 User.findOne({email: req.body.email})
     .then(user => {
         if(user === null){
             res.status(401).json({message: 'user or password incorrect'})
         }else {
             bcrypt.compare(req.body.password , user.password)
                 .then( valid =>{
                     if(!valid){
                         res.status(401).json({message: 'user or password incorrect'})
                     }else{
                         res.status(200).json({
                             userId: user._id,
                             token : jwt.sign(
                                 {userId : user._id},
                                   secretToken,
                                 {expiresIn: '24h'}
                             )
                         })
                     }

                 })
                 .catch(error=> res.status(500).json({error}))
         }
     })
     .catch(error => res.status(500).json({error}))
};