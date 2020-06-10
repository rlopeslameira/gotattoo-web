const express = require('express');
const path = require('path');

app = express();
//app.use(express.static(__dirname + '/public/index.html'));

const file = path.resolve(__dirname, '..', 'build', 'index.html');
console.log(file);

// app.use(express.static(caminho));

app.get('/', function(req, res){
  res.sendFile(file);
});

app.listen(3000);