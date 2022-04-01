const express = require('express'),
  router = express.Router();

const Comments = require('../models/comments');

router.get('/earth.html', function(request, response){
  let comments = Comments.getComments("earth");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("earth", {
    user: request.user,
    comments: comments
  });
});

module.exports = router;
