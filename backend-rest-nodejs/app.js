'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//archivos de rutas
var monster_routes = require('./routes/monster');


// middlewares (capa que se ejecuta antes de un controlador)
app.use(bodyParser.urlencoded({extended:false})); //con esto parseamos los datos de la petición
app.use(bodyParser.json()) ;//Convertimos los datos en JSON

//CORS y Cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// exportar el modulo app
module.exports = app;

//rutas
app.use('/api', monster_routes)

/*Explicaciones:
 1. {
    req.body: accedemos al cuerpo de la petición,
    req.query: accedemos a los datos de la query(url)
    req.params: accedemos a los datos de los parametros
 }
*/