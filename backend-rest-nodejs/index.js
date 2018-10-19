'use strict'
var urlBBDD = 'mongodb://localhost:27017/pocketMonster';
var mongoose = require('mongoose'); //Conexión a MongoDB
var app = require('./app'); //configuracion de express
var port = 3700; //puerto del servidor

mongoose.Promise = global.Promise; // Indicamos que es una promesa
mongoose.connect(urlBBDD) //Conectamos a la base de datos
        .then((status) =>{
            welcomeBBDD();
            app.listen(port, () => {
                welcomeServe();
            })
        })
        .catch((error)=>{
            console.log(error);
        });


//Mensaje de conexiónes ok.
var welcomeBBDD = function(){
    console.log(`

###########################################################################
    ¡Conexión a la base de datos establecida con éxito!"
###########################################################################`
            );
}
var welcomeServe = function(){
    console.log(`
###########################################################################
    ¡Servidor corriendo correctamente en la url: localhost:${port}!
###########################################################################`

            );
}