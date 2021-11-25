const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NutriSchema = new Schema({
    diet:{
        type:String,
        required:true
    },
    exercise:{
        type:String,
        required:true
    },
    rest:{
        type:String,
        required:true
    },
},{timestamps:true});
//model
const Nutrimodel  = mongoose.model("dadsclinic",NutriSchema);
module.exports = Nutrimodel ;
