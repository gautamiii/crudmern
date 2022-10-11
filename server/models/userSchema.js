const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
name:{
type:String,
required:true
},
email:{
type:String,
required:true,
unique:true
},
age:{
type:String,
required:true
},
mobile:{
type:String,
required:true
},
work:{
type:String,
required:true
},
add:{
type:String,
required:true
},
desc:{
type:String,
required:true
},
password:{
    type:String,
    required:true
    }
});

const users = new mongoose.model("crudappcollection", userSchema);
module.exports = users;