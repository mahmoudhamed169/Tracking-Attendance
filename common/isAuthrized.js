var jwt = require('jsonwebtoken');
module.exports = () => {
  return (req, res, next) => {
    var token = req.headers.authorization.split(" ")[1];
    var decode = jwt.verify(token, "shhhhh");
    theUser = decode;
    // console.log(decode); 
    next()   
  };
};
