const jwt = require('jsonwebtoken');

require('dotenv').config();
const secretToken = process.env.SECRET_TOKEN;

module.exports = (req , res , next)=> {
   try{
         //la fonction split pour enlever le mot Bearer de headers.authorization
         const token= req.headers.authorization.split(' ')[1];
         //verify pour décoder le token. 
         const decodedToken = jwt.verify(token , secretToken);
         const userId = decodedToken.userId;
         req.auth = {
            userId:userId
         };
         next();
   }catch (error){
     res.status(403).json({error})
   }
};
