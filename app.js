import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import flash from 'connect-flash' //Mensajes flash (se muestran al usuario luego de realizar una acción)
import session from 'express-session'
import methodOverride from 'method-override'
import passport from 'passport'
import morgan from 'morgan'
import User from './models/usermodels.js'


import userRouter from './routes/user.js' 


const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(flash())

/* app.use((req,res)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
}) */

app.use(userRouter)

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.MONGO_GRUPO10) 
.then(()=>console.log('la base de datos esta conectada'))
.catch(error=>console.log('error'))

app.use(session({
    secret:'El usuario está logueado',
    resave:true,
    saveUninitialized:true  //Permite navegar sin iniciar sesión
}))

app.use(passport.initialize())
app.use(passport.session()) //Guarda los datos de la sesión en un objeto denominado req.user



    

app.listen(process.env.PORT,()=>{
    console.log('el servidor se está ejecutando')
})