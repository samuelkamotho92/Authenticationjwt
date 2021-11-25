const {Router} = require("express");
const controler = require("../controls/authcontrols");
const authRoutes = Router();
authRoutes.route("/login")
.get(controler.get_loginpage)
.post(controler.login_post)
authRoutes.route("/signup")
.get(controler.get_singuppage)
.post(controler.signup_post)
authRoutes.route("/logout")
.get(controler.logout_req);

module.exports = authRoutes;
