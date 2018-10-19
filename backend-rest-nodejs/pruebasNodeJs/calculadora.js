'use strict'

//Para ejecutar este programa:
// node calculadora.js 10 2

// Rescatamos desde el segundo registro porque siempre el primer parametro es la url.
var params = process.argv.slice(2); //Recuperamos los parametros introducidos

var numero1 = parseFloat(params[0]); //Rescatamos el primer parametro
var numero2 = parseFloat(params[1]); //Rescatamos el segundo parametro

console.log(`Número uno es ${numero1}
Número dos es ${numero2}`)

console.log(`
    Buenas esto es una plantilla de javascript
    ##-- Calculadora --#
    Suma: ${numero1 + numero2},
    Resta: ${numero1 - numero2},
    Multiplicación: ${numero1 * numero2},
    División: ${numero1 / numero2}
`)

