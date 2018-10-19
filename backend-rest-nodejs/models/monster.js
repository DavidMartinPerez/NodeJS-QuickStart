'use strict'

// Aquí crearemos el modelo de Monster en mongoose para añadirlos o recuperarlos en MongoDB
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//Definimos la esctrutura que guardaremos en la coleccion.
var MonsterSchema = Schema({
    name: String,
    description: String,
    type: [String],
    strength: Number,
    life: Number,
    nicknames: String,
    sprite: String
})

module.exports = mongoose.model('Monster', MonsterSchema)
//Moongose se encarga de toLowerCase y pluralizar los nombres de las entidades