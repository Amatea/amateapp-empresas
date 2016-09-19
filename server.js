var express = require('express');

var app = express();

app.use(express.static('public'));

app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})

app.listen(3000, function (){
  console.log('Servidor en el puerto 3000')
});