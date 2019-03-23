var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/fact');
var LOADER_IO="loaderio-2ba00ce9ba6fdad15e1d2d814430fd9c";
//process.env.LOADER_IO;
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next) => {
    console.log('in app');
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods", "POST,GET");
        res.header("Access-Control-Allow-Header","Content-Type, Authorization, Content-Length, X-Requested-With,Origin, Accept");
         //intercepts OPTIONS method
         if ('OPTIONS' === req.method) {
            //respond with 200
            res.sendStatus(200);
          }
          else {
          //move on
            next();
          }
    
    });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',apiRouter);
app.use('/'+LOADER_IO,apiRouter);

module.exports = app;
