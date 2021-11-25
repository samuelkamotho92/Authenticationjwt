//require express application
const express = require("express");
const router = express.Router();
//require the controller handler functions
const controllerfunc = require("../controls/blogcontroller")
//blogs route
router.route("/create")
.get(controllerfunc.create_blog);
router.route("/")
.get(controllerfunc.get_allblogs)
.post(controllerfunc.save_blog)
//get specific item
router.route("/:id")
.get(controllerfunc.get_ablog)
.delete(controllerfunc.delete_blog)

//exports the module
module.exports = router;
