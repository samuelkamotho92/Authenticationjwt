const jwt = require("jsonwebtoken");
const authmodel = require("../model/usermodel");
//protecting the routes based on the token and always check if user is logged in
const jwtauthtk = (req, resp, next) => {
  //get  the cookie which has the token
  const token = req.cookies.jwt;
  if (token) {
    //verify token
    jwt.verify(token, "topnutri", (err, decodedtoken) => {
      if (err) {
        //redirect
        console.log(err.message);
        resp.redirect("/login");
      } else {
        //no err we proceed with the route
        console.log({ decodedtoken });
        //continue wuth the next route if no error
        next();
      }
    });
  } else {
    resp.redirect("/login");
  }
};
const getuserinfo = (req, resp, next) => {
  //check for jwt in the cookie  //name of cookie
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "topnutri", async (err, decodedToken) => {
      if (err) {
        resp.locals.user = null;
        next();
      } else {
        //no err we proceed with the route  and get
        //user depending on the decoded tiken id
        let user = await authmodel.findById(decodedToken.id);
        console.log(user);
        //by using locals method helps one to attach values to views
        resp.locals.user = user;
        next();
      }
    });
  } else {
    resp.locals.user = null;
    next();
  }
};
module.exports = { jwtauthtk, getuserinfo };
