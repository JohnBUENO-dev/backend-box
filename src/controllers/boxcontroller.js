const Box = require('../models/box');

class BoxController{
  async store(req,res){

    const box = await Box.create({title: req.body.title});
    //retorna json
    return res.json(box);
  }
  async show(req,res){
    //const box = await Box.findById(req.params.id).populate('files');
    //forma de ordenar objetos ou coleções de forma crescente ou decrescente 1 ou -1
    const box = await Box.findById(req.params.id).populate({
       path: 'files',
       options: { sort:{ createdAt: -1}}

    });
  
    //const box = await Box.create({title: req.body.title});
    //retorna json
    return res.json(box);
  }

}

//retornando new boxcontroller para ter acesso a instancia da classe e as funções da classe

module.exports = new BoxController();