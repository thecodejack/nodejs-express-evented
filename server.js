var express = require('express');
var app = express();
var cors = require('cors');
var user = require('./users');
var event = require('./events');


app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get('/', function(req, res){
  res.send('NodeJS server for LectureMVC');
});


//user REST calls
app.get('/users', function(req, res){
  var ids = req.param('ids'), data;
  console.log(ids);
  if(ids && ids.length) {
    data = user.findByIds(ids);
  } else {
    data = user.findAll();
  }
  res.send(data);
});

app.get('/users/:id', function(req, res){
    var id = Number(req.params.id);
    var data = user.findById(id);
    res.send(data);
});

//update call
app.post('/users/:id', function(req, res){
    console.log(req.param('name'));
    
});

app.delete('/users/:id', function(req, res) {
  res.send(' DELETE User');
});

app.put('/users/:id', function(req, res) {
  res.send(' update User');
});

//lecture REST calls
app.get('/events', function(req, res){
  var data = event.findAll();
  res.send(data);
});

app.get('/events/:id', function(req, res){
    var id = Number(req.params.id);
    var data = event.findById(id);
    res.send(data);
});

//add call
app.post('/events', function(req, res) {
    var cEvent = req.param('event');
    cEvent = event.add(cEvent);
    res.send(cEvent);
});

//update call
app.put('/events/:id', function(req, res){
    console.log(req.param('name'));
});

app.delete('/events/:id', function(req, res) {
  res.send(' DELETE User');
});

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});