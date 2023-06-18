import express from 'express' 
  const router=express.Router()
import passport from "passport"
import crypto from 'crypto'
import async from 'async'  //Funciones asincrónicas que deben realizare en orden. El resultado de una función lo retoma la próxima función
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'

import User from '../models/usermodels.js' 

//Peticiones get

router.get('/',(req,res)=>{
  res.render('pages/index')
})

router.get('/registrar', (req,res)=> {
  res.render('./users/registrar');
});

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



router.get('/changepassword',(req,res)=>{
  res.render('users/changepassword')
})


router.get(('/logout',(req,res)=>{  //No es necesario crear un archivo logout, es una petición del cierre de sesión
  //Mensaje para el usuario que se deslogueo
  req.logOut(); //Método propio de nodejs para cerrar sesión
  res.flash('success_msg','Su sesión ha finalizado correctamente')
  res.redirect('pages/index')
})) 

//Método post

router.post('/registrar', (req, res)=> {
  let {name, email, password} = req.body;

  let userData = {
      name : name,
      email :email
  };

  User.register(userData, password, (err, user)=> {
      if(err) {
          req.flash('error_msg', 'ERROR: '+err);
          res.redirect('/registrar');
      }else{
       res.redirect('/login'); 
      }
      
  });

});


//Login para usuarios registrados

router.post('/login',passport.authenticate('local',{
  successRedirect:'/dashboard',
  failureRedirect:'/login',
  failureFlash:'email o contraseña incorrecta. Intente nuevamente'
}))

router.post('/password/change',(req,res)=>{
  if(req.body.password!==req.body.confirmpassword) {
   //mensaje no son iguales
   res.redirect('/password/change')
  }
  User.findOne({email:req.user.email})
  .then(user=>{
       user.setPassword(req.body.password,error=>{
           user.save()
           .then(user=>{
               //mensaje se cambio la contraseña
               res.redirect('/login')
           })
           .catch(error=>{
               //mensaje error
               res.redirect('/password/change')
           })
       })
  })

})

router.post('/olvido',(req,res)=>{
  let recoveryPassword=''
  async.waterfall([         //Genera un array de objetos, donde cada objeto es una función
    (done)=>{
        crypto.randomBytes(20,(error,buf)=>{  //Con el método randomBytes genero un password random para ql usuario
        let token= buf.toString('hex') //Se combierte buf a string en formato hexadecimal
        done(error,token)
      }) 
    }
  ,
    (token,done)=>{
        User.findOne({email:req.body.email})
        .then(user=>{
          if(!user){
            //Mensaje que no existe el email
            res.redirect('/olvido')
          }
          user.resetPasswordToken=token //Propiedad que definimos en el Schema
          user.resetPasswordExpired=Date.now() + 1800000 //Tiempo en milisegundos
          user.save(error=>{
            done(error,token,user)
          })
        .catch(error=>{
          //mensaje de error
          res.redirect('/olvido')
          })
        })
    },
      (token,user)=>{
        let enviar=nodemailer.createTransport({
          service:'Gmail',
          auth:{
            user:'grupo10@gmail.com',
            pass:'Grupo@10'
          }
        })
        let mailOptions={ //Redacto el mail
          to:user.email,
          from:'grupo10@gmail.com',
          subjet:'Recuperar contraseña',
          text:'Para recuperar tu contraseña debes ingresar a : \n'+token+'\n Recuerde que debe hacerlo dentro de los próximos 30 minutos'
        }
        enviar.sendMaol(mailOptions,error=>{
          //Se enviaron las instrucciones
          res.redirect('/login')
        })
      }
  ]) 
})

export default router


