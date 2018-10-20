'use strict'

var express = require('express');
var MonsterController = require("../controllers/monster");

var router = express.Router();

//middleware
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './sprites' });

// configuracion de rutas
router.get('/', MonsterController.infoApp)
router.get('/test', MonsterController.test)
router.post('/new-monster', MonsterController.newMonster)
router.get('/monster/:id', MonsterController.getMonster)
router.get('/all-monsters', MonsterController.allMonsters)
router.put('/update-monster/:id', MonsterController.updateMonster)
router.delete('/delete-monster/:id', MonsterController.deleteMonster)
router.post('/upload-sprite/:id', multipartMiddleware , MonsterController.uploadSprite)
router.get('/image/:image', MonsterController.getImageFile)


module.exports = router;