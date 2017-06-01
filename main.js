var express = require('express');

var app = express();

var fs = require('fs');

app.use(express.static(__dirname));

app.listen(8080);
console.log('Local server is running at port 8080..');