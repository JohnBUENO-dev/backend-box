const Box = require("../models/box");
const File = require("../models/file");

class filecontroller{
  async store(req,res){
    //console.log(req.file);
    const box = await Box.findById(req.params.id);

    const file = await File.create({
       title: req.file.originalname,
       path: req.file.key,

    });
    //pode ser tratado como um array
    box.files.push(file);
    //assicrono
    await box.save();
     
    req.io.sockets.in(box._id).emit("file",file);

    return res.json(file);
    //return res.send("ok");
  }
}

module.exports = new filecontroller();

//50 minutos