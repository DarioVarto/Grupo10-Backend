import express from 'express'
const router=express.Router()
import passport from "passport"
import crypto from 'crypto'
import async from 'async'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'

/* import User from '../models/usermodels.js'  */

//Peticiones get


router.get('/',(req,res)=>{
  res.render('pages/index')
})

router.get('/alluser',(req,res)=>{
  User.find({})  //Busca y me trae todos los usuarios
  .then(usuarios=>{
    res.render('users/alluser',{usuarios:usuarios}) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
  })
  .catch(error=>{
    res.render('users/alluser') //Renderizo la página de todos los usuarios
  })
  
})

router.get('/edituser/:id',(req,res)=>{
  let buscarId={_id:req.params.id} 
  User.findOne(buscarId)
  .then(user=>{
    res.render('users/edituser',{user:user})
  })
  .catch(error=>{
    res.flash('error_msg','Error:'+error) //Muestro el error por el que no puede realizar la acción
    res.redirect('users/allusers') /* Redirijo a la página de todos los usuarios con un mensaje de error */
  })
})

router.get('/login',(req,res)=>{
  res.render('users/login')
})

router.get('/olvido',(req,res)=>{
    res.render('users/olvido')
})

router.get('/registrar',(req,res)=>{
  res.render('users/registrar')
})


router.get(('/logout',(req,res)=>{  //No es necesario crear un archivo logout, es una petición del cierre de sesión
  //Mensaje para el usuario que se deslogueo
  req.logOut(); //Método propio de nodejs para cerrar sesión
  res.flash('success_msg','Su sesión ha finalizado correctamente')
  res.redirect('pages/index')
})) 

//Método post

router.post('/signup',(req,res)=>{
  let{nombre,email,password}=  req.body

  let userData={
       nombre:nombre,
       email:email
  };
  console.log(userData)
  console.log(password)

  userData.save()
})

//Login para usuarios registrados

router.post('/login',passport.authenticate('local',{
  successRedirect:'/dashboard',
  failureRedirect:'/login',
  failureFlash:'email o contraseña incorrecta. Intente nuevamente'
}))

export default router


