var express = require('express');
var router = express.Router();
const controller=require('../controllers/getfact.controller');

router.post('/getfact',controller.find);


module.exports=router;