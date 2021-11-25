const express = require("express");
const morgan  = require("morgan");
const mongoose = require ("mongoose");
const cookieParse = require("cookie-parser");
const app = express();
app.set("view engine","ejs");
const blogrouter = require("./routes/blog");
const authrouter = require("./routes/authroutes")
const {jwtauthtk,getuserinfo} = require("./middleware/authmiddleware")

//middle ware
//serving statuc files
app.use(express.static("public"));
//body parser mddle ware
//sending string from form action
app.use(express.urlencoded({extended:true}));
//sending json data
app.use(express.json())
app.use(morgan("dev"));
//cookie-parser middlwqare
app.use(cookieParse())
const dbURL = 
"mongodb+srv://sam:37874493@nodetuts.4ka00.mongodb.net/Nutrition?retryWrites=true&w=majority";
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then(result=>{
    app.listen(5000,function () {
        console.log("working fine");
    })
console.log("connected to database")
}).catch(err=>{
    console.log(err.message);
})

//connecting with database 
// app.get("/add-blogs",(req,resp)=>{
//     //instance of value to be added to collection
//     const nutri = new Nutrimodel(req.body);
//     nutri.save().then(result=>{
//         resp.send(result)
//     }).catch(err=>{
//         console.log(err.message); 
//     })
// })

app.get("*",getuserinfo);
//responding to req
app.get("/",(req,resp)=>{
    const title = "Home";
    resp.render("index",{title});

})
app.get("/contact",jwtauthtk,(req,resp)=>{
    const title = "contact"
    resp.render("contact",{title});
});
app.get("/login",(req,resp)=>{
    const title = "login"
    resp.render("login",{title});
});
app.get("/signup",(req,resp)=>{
    const title = "signup"
    resp.render("signup",{title});

});
app.get("/index",jwtauthtk,function (req,resp) {
    resp.redirect("/");
});
//cookie
app.get("/set-cookie",(req,resp)=>{
    // resp.setHeader("Set-cookie","new-user=true");
    resp.cookie("new-user",false);
    resp.cookie("student",true,{maxAge:1000*60*60*24});
resp.cookie("frelancer",true,{maxAge:1000*60*60*24*2,secure:true});
resp.cookie("3rd year",true,{maxAge:1000*60*60*24*2,httpOnly:true});
    resp.send("Your first cookie");
});

//blog route middlware
app.use("/blogs",jwtauthtk,blogrouter);

//auth middlware
app.use(authrouter)


//error middleware
app.use(function (req,resp) {
    const title = "404"
    resp.render("404",{title});
});

// app.listen(5000,function () {
//     console.log("working fine");
// })