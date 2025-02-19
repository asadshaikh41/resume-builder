const mongoose=require('./db')

const RegisterSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
module.exports=mongoose.model("register",RegisterSchema)