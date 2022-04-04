const express = require('express'),
  router = express.Router();

const Comments = require('../models/comments');
const Users = require('../models/users');

router.get('/comment.html', function(request, response){
  let user = JSON.stringify(request.user);
  let earthComments = Comments.selectCommentsByUser("earth", user);
  let marsComments = Comments.selectCommentsByUser("mars", user);
  let potdComments = Comments.selectCommentsByUser("potd", user);
  let neowsComments = Comments.selectCommentsByUser("neows", user);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("comment", {
    user: request.user,
    earthComments: earthComments,
    marsComments: marsComments,
    potdComments: potdComments,
    neowsComments: neowsComments
  });
});

router.get('/delete', function(request, response){
  let index = request.query.index;
  let page = request.page.index;
  Comments.deleteComments(page, index);
  response.redirect('/comment.html');
});


router.get('/edit', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("comment", {
    user: request.user
  });
});

router.post('/comment', function(request, response){
  let user = request.user.emails[0].value;
  let date = new Date();
  let text =  request.body.comment;
  let pages = request.body.pages;
  let comment = {
    user: user,
    date: date,
    comment: text
  };
  let users = Users.getUsers();
  //has own property
  if(!users.hasOwnProperty(user)){//if we don't have the key
    let userEntity = {
      user: user,
      date: date,
      permission: true
    };
    users[user] = userEntity;
    Users.writeUsers(users);//added the new user when they make a new comment
  }
  /*
    when a user logs in see if they exist in the users and if they don't add a user entity
    (create the entity, load the users, insert the new user, write it back)-> a dictionary
    key for the dictionary is the username
    when user makes a comment we would load the users, look up the specific user, and check if permission is true
  */
  if(users[user].permission == true){
    let comments = Comments.getComments(pages);
    comments.push(comment);//the comment is not pushing
    Comments.writeComments(pages, comments);
    return response.redirect("/" + pages + ".html");
    //redirect to success page
  }
  response.redirect('/error?code=404');
  //redirect to error
});

module.exports = router;
