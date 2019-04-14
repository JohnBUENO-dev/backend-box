const mongoose = require("mongoose");

const file = new mongoose.Schema(
   {
    title: {
        type: String,
        required: true
    },
    path: {
      type: String,
      required: true  
    }
   },
   {
   timestamps: true,
   toObject: {virtuals: true},
   toJSON: {virtuals:true}
   }
 );
 
 file.virtual("url").get(function(){
   //para ter acesso as imagens nas paginas estaticas passasse a variavel de ambiente
   //process.env.URL para acessar porta liberada no heroku
   const url = process.env.URL || 'https://box-teste-1.herokuapp.com'; //|| 'http://localhost:3333'

   return `${url}/files/${encodeURIComponent(this.path)}`;
 
  }); 

 module.exports = mongoose.model("file",file);