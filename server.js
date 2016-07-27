var express = require('express');

var app = express();
var results = {ipaddress:null,language:null,software:null};


app.set('port',process.env.PORT || 5000);

app.use('/', function(req, res, next) {
  results.ipaddress = req.headers['x-forwarded-for'] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress;
  results.language = req.headers["accept-language"].split(',')[0];
  var regExp = /\(([^)]+)\)/;
  results.software = req.headers["user-agent"].match(regExp)[1];

res.json(results);
});



app.listen(app.get('port'),function(){
  console.log('listening on:' + app.get('port'));
});
