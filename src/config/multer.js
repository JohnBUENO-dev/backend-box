const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {

   dest: path.resolve(__dirname, '..','..','tmp'),
   storage: multer.diskStorage({
       destination: (req,file,cb) => {
         cb(null,path.resolve(__dirname, '..','..','tmp'));
       },
       filename: (req,file,cb) => {
         //16bits de caractes aleatorios
        crypto.randomBytes(16, (err,hash)=>{
          if(err) cb(err);
           //aspas desse jeito da condição de adicionar variaveis e outras informações apostofo
          file.key = `${hash.toString('hex')}-${file.originalname}`;

          cb(null, file.key);


        })
       }
   })
};