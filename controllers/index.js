const express = require('express'),
  router = express.Router();


router.get('/', function(request, response) {
  console.log("user is [" + JSON.stringify(request.user) + "]"); //Passport adds user to the Request object if loggedIn
  //console.log(request.user._json.email); //Passport adds user to the Request object if loggedIn
  console.log("request: " + request); //Encrypted session info is sent as a request header
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user
  });
});

router.get('/login', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("login", {
    user: request.user
  });
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }

  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});

module.exports = router;
