import express from 'express'
const router = express.Router()
import passport from "passport"
import crypto from 'crypto'
import async from 'async'  //Funciones asincrónicas que deben realizare en orden. El resultado de una función lo retoma la próxima función
import nodemailer from 'nodemailer'

import LocalStrategy from 'passport-local'

import User from '../models/usermodels.js'

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function (err, usuario) {
      if (err) { return done(err); }
      if (!usuario) { return done(null, false); }
      if (!usuario.verifyPassword(password)) { return done(null, false); }
      return done(null, usuario);
    });
  }
));




//Peticiones get

router.get('/', (req, res) => {
  res.render('pages/index')
})

router.get('/contacto', (req, res) => { //link contacto footer
  res.render('pages/contacto')
})

router.get('/nosotros', (req, res) => { //link nosotros footer
  res.render('pages/nosotros')
})

router.get('/historia', (req, res) => { //link historia footer
  res.render('pages/historia')
})

router.get('/soporte', (req, res) => { //link soporte footer
  res.render('pages/soporte')
})

router.get('/informacion', (req, res) => { //link informacion footer
  res.render('pages/informacion')
})
router.get('/privacidad', (req, res) => { //link privacidad footer
  res.render('pages/privacidad')
})
router.get('/terminos', (req, res) => { //link terminos footer
  res.render('pages/terminos')
})

router.get('/edit', (req, res) => {
  res.render('users/edit')
})

router.get('/registrar', (req, res) => {
  res.render('./users/registrar');
});

router.get('/alluser', (req, res) => {
  User.find({})  //Busca y me trae todos los usuarios
    .then(usuarios => {
      res.render('./users/alluser', { usuarios: usuarios }) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
    })
    .catch(error => {
      res.render('users/alluser') //Renderizo la página de todos los usuarios
    })

})

router.get('/edituser/:id', (req, res) => {
  let buscarId = { _id: req.params.id }
  User.findOne(buscarId)

    .then(usuario => {
      res.render('./users/edituser', { usuario: usuario })
    })
    .catch(error => {
      console.log(error)
      res.flash('error_msg', 'Error:' + error) //Muestro el error por el que no puede realizar la acción
      res.redirect('users/allusers') /* Redirijo a la página de todos los usuarios con un mensaje de error */
    })
})

router.get('/login',(req, res) =>{
  res.render('users/login')
});




router.get('/olvido', (req, res) => {
  res.render('users/olvido')
})



router.get('/changepassword', (req, res) => {
  res.render('users/changepassword')
})


router.get(('/logout', (req, res) => {  //No es necesario crear un archivo logout, es una petición del cierre de sesión
  //Mensaje para el usuario que se deslogueo
  req.logOut(); //Método propio de nodejs para cerrar sesión
  res.flash('success_msg', 'Su sesión ha finalizado correctamente')
  res.redirect('pages/index')
}))

//Método post

router.post('/registrar', (req, res) => {
  let { nombre, email, password } = req.body;

  let userData = {
    nombre: nombre,
    email: email,
    esAdmin:false
  };

  User.register(userData, password, (err, useruario) => {
    if (err) {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/registrar');
    } else {
      req.flash('success_msg', 'Usuario registrado exitosamente');
      res.redirect('/login');
    }

  });

});


//Login para usuarios registrados

  router.post('/login', 
(req, res, next)=>{
  passport.authenticate('local', passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }
    if (!usuario) {

      req.flash('error_msg', 'ERROR: usuario o contraseña incorrecta');
      return res.redirect('/login');
      
    }
    if(usuario.esAdmin){
      return res.redirect('/alluser');
    }else{
      return res.redirect('/')
    };

  })(req, res, next)
   
  
  )
}
); 

router.post('/password/change', (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    req.flash('error_msg', 'Las contraseñas no coinciden');
    return res.redirect('/password/change')
  }
  User.findOne({ email: req.user.email })
    .then(usuario => {
      usuario.setPassword(req.body.password, error => {
        usuario.save()
          .then(usuario => {
            req.flash('success_msg', 'La contraseña se modifico exitosamente');
            res.redirect('/login')
          })
          .catch(error => {
            req.flash('error_msg', 'Error:'+error)
            res.redirect('/password/change')
          })
      })
    })

})

router.post('/olvido', (req, res) => {

  async.waterfall([         //Genera un array de objetos, donde cada objeto es una función
    (done) => {
      crypto.randomBytes(20, (error, buf) => {  //Con el método randomBytes genero un password random para ql usuario
        let token = buf.toString('hex') //Se combierte buf a string en formato hexadecimal
        done(error, token)
      })
    }
    ,
    (token, done) => {
      User.findOne({ email: req.body.email })
        .then(usuario => {
          if (!usuario) {
            //Mensaje que no existe el email
            res.redirect('/olvido')
          }
          usuario.resetPasswordToken = token //Propiedad que definimos en el Schema
          usuario.resetPasswordExpired = Date.now() + 1800000 //Tiempo en milisegundos
          usuario.save(error => {
            done(error, token, usuario)
          })
            .catch(error => {
              //mensaje de error
              res.redirect('/olvido')
            })
        })
    },
    (token, usuario) => {
      let enviar = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          usuario: 'grupo10@gmail.com',
          pass: 'Grupo@10'
        }
      })
      let mailOptions = { //Redacto el mail
        to: usuario.email,
        from: 'grupo10@gmail.com',
        subjet: 'Recuperar contraseña',
        text: 'Para recuperar tu contraseña debes ingresar a : \n' + token + '\n Recuerde que debe hacerlo dentro de los próximos 30 minutos'
      }
      enviar.sendMaol(mailOptions, error => {
        //Se enviaron las instrucciones
        res.redirect('/login')
      })
    }
  ])
})

//PUT routes starts here
router.put('/edituser/:id', (req, res) => {
  let buscarId = { _id: req.params.id };

  User.updateOne(buscarId, {
    $set: {
      nombre: req.body.name,
      email: req.body.email
    }
  })
    .then(() => {
      req.flash('success_msg', 'Los datos se modificaron exitosamente');
      res.redirect('/alluser');
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/users/alluser');
    })
});

//DELETE routes starts here
router.delete('/delete/usuario/:id', (req, res) => {
  let buscarId = { _id: req.params.id };
  User.deleteOne(buscarId)
    .then(() => {
      req.flash('success_msg', 'Usuario borrado exitosamente');
      res.redirect('/alluser');
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/alluser');
    })
});


export default router


