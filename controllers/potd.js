const express = require('express'),
  router = express.Router();

const Comments = require('../models/comments');

router.get('/potd.html', function(request, response){
  let comments = Comments.getComments("potd");
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("potd", {
    user: request.user,
    comments: comments
  });
});
module.exports = router;
