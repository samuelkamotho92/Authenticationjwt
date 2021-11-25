const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt =  require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
email:{
type:String,
required:[true,"Please enter an email"],
unique:true,
lowercase:true,
validate:[isEmail,"Please enter a valid email"]
    },
password:{
type:String,
required:[true,"Please enter a password"],
minlength:[8,"Please enter 8 character"]
    }
})


//posthook
//create method fires save hook
userSchema.post("save",(doc,next)=>{
    console.log("user has been created and saved in the database",doc)
    next();
    })
    //pre hook
    //asynch function
userSchema.pre("save",async function(next){
        //this is the instance of signed in user
    const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt);
        next();
    })

userSchema.statics.login = async function(email,password){
    //check if the email match with any of the collection in db
    //"this" is model not instance
 const user = await this.findOne({email});
 //returns the collection
 if(user){
    const auth = await bcrypt.compare(password,user.password);
    if(auth){
return user;
    }
    throw Error("incorrect password");
 }
 throw Error("incorrect email");
    }
    //creating model
const Usermodel = mongoose.model("user",userSchema);
module.exports = Usermodel;