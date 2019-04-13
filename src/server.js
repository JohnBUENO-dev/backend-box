const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();
//aqui eu defino que todo mundo pode acessar minha aplicação de qualquer dominio
//heroku
//cyberpunk2077_ senha 
//https://github.com/johnpaulwynow/backend-box.git
//git init
//git add README.md
//git commit -m "first commit"
//git remote add origin https://github.com/johnpaulwynow/backend-box.git
//git push -u origin master
// criar arquivo .gitkeep 
//
//git config --global user.email "stevewolfjp@hotmail.com"
//git config --global user.name "Your Name"

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//criar sala expecifica para 
io.on("connection", socket =>{
   socket.on('connectRoom', box =>{
      socket.join(box);
   })
})

//requisições do tipo http e socket oks
mongoose.connect("mongodb+srv://john:cyberpunk@cluster0-dhda7.mongodb.net/test?retryWrites=true",
{
   useNewUrlParser: true
}
);
//passando o io para a app  middle global next()passa para o restro da aplicação
app.use((req,res,next) =>{
   req.io = io;

   return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//deixar estatico sempre que precisar acessar os arquivo diretamente , passa o express pra ajudar nas rotas e o path para os diretorios
//criando o redirecionamento para acesso aos arquivos
app.use("/files", express.static(path.resolve(__dirname, "..","tmp")));

app.use(require("./routes"));


app.listen(3333);

//add cors para determinar quem pode acessar a aplicação yarn add cors
//deixar a aplicação real time instalando yarn add socket.io