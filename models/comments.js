const fs = require('fs');

exports.getComments =  function(page) {
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/'+ page +'Comment.json'));
  return comments;
}

exports.writeComments = function(page, comments){
  fs.writeFileSync(__dirname+'/../data/'+ page +'Comment.json', JSON.stringify(comments));
}
//all CRUD functions to be located here
