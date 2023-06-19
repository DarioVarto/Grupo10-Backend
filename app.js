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


import userRouter from './routes/user.js' 
import productRouter from './routes/products-detail.js' 


const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(flash())

app.use(userRouter)
app.use(productRouter)

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.MONGO_GRUPO10) 
.then(()=>console.log('la base de datos esta conectada'))
.catch(error=>console.log('error'))
    

app.listen(process.env.PORT,()=>{
    console.log('el servidor se está ejecutando')
    console.log(process.env.PORT)
})