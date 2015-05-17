var express = require('express');
var app = express();
var fs = require("fs");
var guid = require("guid");
var Validation = require('./app/scripts/Validation.js');

var contacts = JSON.parse(
	fs.readFileSync('db.json',"utf8")
).contacts;

app.get('/contacts',function(req,res){
	res.header('Access-Control-Allow-Origin', '*');
	res.json(contacts);
})

app.post('/contacts/new',function(req,res){
	res.header('Access-Control-Allow-Origin', '*');
	console.log("added contact.",req.body);
	contacts.push(req.body);
	fs.writeFileSync('db.json',contacts,"utf8")
//	res.json(contacts);
})

var port = app.listen(3000);

module.exports.server = app;
module.exports.listener = port;