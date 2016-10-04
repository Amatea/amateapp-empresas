'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(methodOverride());


app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function (){
  console.log('Servidor en el puerto 3000')
});