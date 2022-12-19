require('dotenv').config()

const { expressjwt: jwt} = require('express-jwt')

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'myPayload', 
    getToken: getTokenFromHeaders
  });

  function getTokenFromHeaders (req) {

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
 
        // Get the encoded token string and return it
        const token = req.headers.authorization.split(" ")[1];
        return token;
      } 
      
      return null;

  }

  module.exports = {
    isAuthenticated
  }