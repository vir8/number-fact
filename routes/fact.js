var express = require('express');
var router = express.Router();
var LOADER_IO="loaderio-2ba00ce9ba6fdad15e1d2d814430fd9c";
//process.env.LOADER_IO;
const controller=require('../controllers/getfact.controller');

router.post('/getfact',controller.find);
router.get('/'+LOADER_IO+'/',controller.loader);

module.exports=router;