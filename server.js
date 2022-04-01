const express = require('express');
  router = express.Router();
const fs = require('fs');
const ejs = require('ejs');
const methodOverride = require('method-override');

const app = express();

//const Comments = require('../models/comments');

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'));//middleware for CRUD:UPDATE and DELETE
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.use(require('./controllers/auth'));
app.use(require('./controllers/comment'));
app.use(require('./controllers/index'));
app.use(require('./controllers/potd'));
app.use(require('./controllers/mars'));
app.use(require('./controllers/earth'));
app.use(require('./controllers/neows'));

app.get('/subscribe.html', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("subscribe", {
    user: request.user
  });
});

app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404",
    user: request.user
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
