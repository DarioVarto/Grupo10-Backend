import {Schema,model} from "mongoose";
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

let userSchema=new Schema({
    nombre: String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
})

//module.exports=mongoose.model('User',userSchema)

userSchema.plugin(passportLocalMongoose,{usernameField:'email'}) //Guardo el email mientras dure la sesión en usernameField
export default model('User',userSchema)

