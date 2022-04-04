const fs = require('fs');

exports.getComments =  function(page) {
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/'+ page +'Comment.json'));
  return comments;
}

exports.writeComments = function(page, comments){
  fs.writeFileSync(__dirname+'/../data/'+ page +'Comment.json', JSON.stringify(comments));
}

exports.deleteComments = function(page, index){
  //open up the comments: getComments
  let comments = exports.getComments(page);
  //remove the message
  comments.remove(index);
  //write the messages: writeComments
  exports.writeComments(page, comments);
}

exports.selectCommentsByUser = function(page, user){
  //look through the comments and any comment with a matching user goes into a new list/dictionary
  //must put the index of the message in the data somewhere
  let comments = exports.getComments(page);
  let results = [];
  for(let i = 0; i<comments.length; i++){
    if(comments[i].user == user){
      comment = comments[i];
      comment.index = i;
      comment.page = page;
      results.push(comment);
    }
  }
  console.log()
  return results;
}
exports.updateComments = function(page, index, message){
  let comments = exports.getComments(page);
  comments[index].comment = message;
  comments[index].date = new Date();
  exports.writeComments(page, comments);
}
//all CRUD functions to be located here
