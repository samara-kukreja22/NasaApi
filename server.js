const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
/*
take all the routes and put them into js files
*/

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user
  });
});

app.get('/potd.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("potd");
});

app.get('/mars.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("mars");
});

app.get('/astronomy.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("astronomy");
});

app.get('/earth.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("earth");
});

app.get('/neows.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("neows");
});

app.get('/subscribe.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("subscribe");
});

app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
