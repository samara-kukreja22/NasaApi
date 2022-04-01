const express = require('express'),
  router = express.Router();

const Comments = require('../models/comments');

router.get('/mars.html', function(request, response){
  let comments = Comments.getComments("mars");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("mars", {
    user: request.user,
    comments: comments
  });
});

module.exports = router;
