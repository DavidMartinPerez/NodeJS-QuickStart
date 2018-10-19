'use strict'

var Monster = require('../models/monster');
var fs = require('fs');

var dateNow = () => {
    var dt = new Date();
    return(`${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()}:${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`);
}

var controller = {
    infoApp: function(req, res){
        console.log(dateNow(), "| GET / | ", req.query);
        res.status(200).send(
            "<h1>Servidor Pocket Monsters</h1><p>by <a target='_blank' href='https://github.com/DavidMartinPerez'>David Martin Pérez</a></p>"
        );
    },

    test: function(req, res){
        console.log(dateNow(), "| GET /test | ", req.query);
        return res.status(200).send({
            /* 1. Explicación de req */
            status: "OK",
            message: "Servidor corriendo perfectamente."
        })
    },

    newMonster: function(req, res){
        var monster = new Monster();
        console.log(dateNow(), "| POST /new-monster | ", req.query);

        try{
            if(req != null && req.body != null){
                var params = req.body;
                monster.name = params.name;
                monster.description = params.description;
                monster.type = params.type;
                monster.strength = params.strength;
                monster.life = params.life;
                monster.nicknames = params.nicknames;
                monster.sprite = null;

                monster.save((err,monsterStored) => {
                    if(err) return console.log("save monster ko"),res.status(500).send({message: "Error al guardar monstruo"});

                    if(!monsterStored) return console.log("save monster ko"),res.status(404).send({message: "No se ha podido guardar el monstruo"});

                    return console.log("save monster ok"), res.status(200).send({monster:monsterStored})
                });

            }else{
                return res.status(400).send({
                    message: "Faltan datos introducidos"
                })
            }

        }catch(error){
            console.log(error)
            return res.status(500).send({
                error
            })
        }
    },

    getMonster: function(req, res){
        var id = req.params.id;
        console.log(dateNow(), `| GET /monster/:${id} | "`, req.query);

        Monster.findById(id, (err, monster) => {
            if(err) return console.log("get monster ko"),res.status(500).send({message: "Error al obtener monstruo, no es formato de ID"});

            if(!monster) return console.log("get monster ko"),res.status(404).send({message: "No se ha podido obtener el monstruo"});

            return res.status(200).send({monster})
        });
    },

    allMonsters: function(req, res){
        console.log(dateNow(), `| GET /all-monsters | "`, req.query);

        Monster.find({}).sort('+strength').exec((err, monsters) => {
            if(err) return res.status(500).send({message:"Error al devolver datos."});

            if(!monsters) return res.status(404).send({message:"No existen monstruos"});

            return res.status(200).send({monsters})
        }) //Recuperar todos los monstruos
    },

    updateMonster: function(req, res){

        var id = req.params.id
        var update = req.body;

        console.log(dateNow(), `| PUT /update-monster/${id} | "`, req.query);

        Monster.findByIdAndUpdate(id, update, {new:true}, (err, monsterUpdated) => {
            if(err) return res.status(500).send({message:"Error al actualizar datos."});

            if(!monsterUpdated) return res.status(404).send({message:"No existe ese monstruo"});

            return res.status(200).send({monster: monsterUpdated})
        })

    },

    deleteMonster: function(req, res){

        var id = req.params.id
        console.log(dateNow(), `| DELETE /delete-monster/${id} | "`, req.query);

        Monster.findByIdAndDelete(id, (err, monsters) => {
            if(err) return res.status(500).send({message:"Error al eliminar el monstruo."});

            if(!monsters) return res.status(404).send({message:"No puedes eliminar lo que no existe"});

            return res.status(200).send({message: "Eliminado correctamente"});
        })

    },

    uploadSprite: function(req, res){
        var id = req.params.id;
        var fileSprite = "Imagen not found";

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'svg'){
                //Aunque la petición vaya mal nos quedamos con la imagen guardada
                Monster.findByIdAndUpdate(id, {sprite: fileName}, {new:true}, (err, monsterUpdate, )=>{
                    if(err) return res.status(500).send({message:"Error en la subida."});

                    if(!monsterUpdate) return res.status(404).send({message:"No puedes actualizar algo que no existe..."});

                    return res.status(200).send({monster: monsterUpdate});
                });
            } else {
                //Con fileSystem no subimos imagenes.
                fs.unlink(filePath, (err) => {
                    res.status(200).send({message: "Formato incorrecto"})
                })
            }
        }else{
            return res.status(400).send({
                message: fileSprite
            })
        }
    }
};

module.exports = controller;