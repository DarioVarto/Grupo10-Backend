
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose' //Permite que queda seteado el email de la base de datos

let userScheme=new mongoose.Schema({
    nombre: String,
    email:String,
    esAdmin:Boolean,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
})

//module.exports=mongoose.model('User',userSchema)

userScheme.plugin(passportLocalMongoose,{usernameField:'email'}) //Guardo el email mientras dure la sesión en usernameField

export default mongoose.model('User',userScheme)

