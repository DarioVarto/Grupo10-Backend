import {Schema,model} from "mongoose";

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

export default model('User',userSchema)