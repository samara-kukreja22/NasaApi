const express = require('express'),
  router = express.Router();

const Comments = require('../models/comments');

router.get('/neows.html', function(request, response){
  let comments = Comments.getComments("neows");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("neows", {
    user: request.user,
    comments: comments
  });
});

module.exports = router;
