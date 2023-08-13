const mongoose = require('mongoose');
const uniqueValidator= require('mongoose-unique-validator');

//Ajout d'une schema de données pour les  utilisateurs
const userSchema = mongoose.Schema({
      email : {type : String , required : true , unique:true},
      password : {type: String , required : true}
});

//pour eviter les erreurs de générées par défaut par MongoDB qui sont difficile a resoudre 
//a valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in,
//s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);