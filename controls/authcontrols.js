const usermodel = require("../model/usermodel");
const jwt = require("jsonwebtoken")
const cookieParse = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParse());
//error handling function
const handlerrors = (err)=>{
   console.log(err.message,err.code)
   //error object 
   let  errors = { 
       email:"",
       password:""
   }

   if(err.message === "incorrect password"){
       errors.password = "incorrect password,try again or click change password"
   }
   if(err.message === "incorrect email"){
    errors.email = "seems you forgot your email"
}  
   if(err.code === 11000){
       errors.email = "Duplicate email,enter a unique one";
   }
   if(err.message.includes( "user validation failed")){
console.log(err.errors);
Object.values(err.errors).forEach(err=>{
    errors[err.properties.path] = err.properties.message; 
})
   }
   return errors;
};

const maxAge = 3*24*60*60;
//create a user
const createToken = (id)=>{
    return jwt.sign({id},"topnutri",{
        expiresIn:maxAge
    })
}
const get_loginpage = (req,resp)=>{
    resp.render("login");
};

const get_singuppage = (req,resp)=>{
    resp.render("signup");
}
//async function takes osme time for it to be done
const signup_post =async  (req,resp)=>{ 
    console.log(req.body)
    const {email,password} = req.body;
    try{
//connect to the database and create anew user
const user = await usermodel.create({email,password})
//create a token to the user created
const usertoken = createToken(user._id);
//create a cookie for token
resp.cookie("jwt",usertoken,{httpOnly:true,maxAge:maxAge*1000});
//send back json data to frontend
 resp.status(201).json({user:user._id,redirect:"/"})
    }catch(err){
//error handling function to get the values
const error = handlerrors(err);
resp.status(404).json({error:error})
    }
}
const login_post = async  (req,resp)=>{
const {email,password} = req.body;
try{
    //if it matches returns the user 
    const user = await usermodel.login(email,password);
    const usertoken = createToken(user._id);
//create a cookie for token
resp.cookie("jwt",usertoken,{httpOnly:true,maxAge:maxAge*1000});
//send to frontend the user
    resp.status(200).json({user:user._id,redirect:"/"});
}catch(err){
    const error = handlerrors(err);
resp.status(404).json({error});
}
}
const logout_req = (req,resp)=>{
    resp.cookie("jwt","",{maxAge:1})
resp.redirect("/");
}
module.exports = {
    get_loginpage,
    get_singuppage,
    login_post,
    signup_post,
    logout_req
}