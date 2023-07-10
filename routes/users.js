import express from 'express'
const router = express.Router()
import passport from "passport"
import crypto from 'crypto'
import async from 'async'  //Funciones asincrónicas que deben realizare en orden. El resultado de una función lo retoma la próxima función
import nodemailer from 'nodemailer'

import LocalStrategy from 'passport-local';

import User from '../models/usermodels.js'


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
  function(email, password, done) {
    User.findOne({ email: email }, function (err, usuario) {
      if (err) { return done(err); }
      if (!usuario) { return done(null, false); }
      if (!usuario.verifyPassword(password)) { return done(null, false); }
      return done(null, usuario);
    });
  }
));
/* router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }
    if (!usuario) {
      req.flash('error_msg', 'ERROR: usuario o contraseña incorrecta');
      return res.redirect('/login');
    }
    if (usuario.esAdmin) {
      return res.redirect('/alluser');
    } else {
      let userName = usuario.email;
      
      res.render('pages/index', { userName: userName });
    }
  })(req, res, next);
}); */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }
    if (!usuario) {
      req.flash('error_msg', 'ERROR: usuario o contraseña incorrecta');
      return res.redirect('/login');
    }
    if (usuario.esAdmin) {
      req.flash('success_msg', '🟢🟢🟢BIENVENIDO', (usuario.nombre).toUpperCase(), 'USTED ES EL ADMINISTRADOR✅✅✅')
      return res.redirect('/alluser');
    } else {
      let userName = usuario.email;
      req.login(usuario, (err) => {
        if (err) {
          return next(err);
        }
        
        return res.render('pages/index', { userName: userName });
      });
    }
  })(req, res, next);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.usuario = req.user;
    
    return next();
  }
  req.flash('success_msg', ' 💻💻💻 Para Navegar en la Web debe Loguearse por favor! 🆗🆗🆗')
  res.redirect('/login');
}

//Peticiones get

router.get('/',(req, res) => {
 const userName = req.query.userName;
  res.render('pages/index', { userName: userName });
})

router.get('/contacto', ensureAuthenticated,(req, res) => { //link contacto footer
  let userName = req.usuario.email;
  if (userName){
    res.render('pages/contacto', { userName: userName })
  }
  else{
    res.render('pages/contacto')
  }
})

router.get('/nosotros', ensureAuthenticated, (req, res) => {
  let userName = req.usuario.email;
  res.render('pages/nosotros', { userName: userName });
});

router.get('/historia', ensureAuthenticated, (req, res) => { //link historia footer
  let userName = req.usuario.email;
  res.render('pages/historia', { userName: userName })
})

router.get('/soporte', ensureAuthenticated, (req, res) => { //link soporte footer
  let userName = req.usuario.email;
  res.render('pages/soporte', { userName: userName })
})

router.get('/informacion', ensureAuthenticated, (req, res) => { //link informacion footer
  let userName = req.usuario.email;
  res.render('pages/informacion', { userName: userName })
})
router.get('/privacidad', ensureAuthenticated, (req, res) => { //link privacidad footer
  let userName = req.usuario.email;
  res.render('pages/privacidad', { userName: userName })
})
router.get('/terminos', ensureAuthenticated, (req, res) => { //link terminos footer
  let userName = req.usuario.email;
  res.render('pages/terminos', { userName: userName })
})

router.get('/edit', ensureAuthenticated, (req, res) => {
  let userName = req.usuario.email;
  res.render('users/edit', { userName: userName })
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

router.get('/login', (req, res) => {
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
  res.redirect('/login')
}))

//Método post

router.post('/registrar', (req, res) => {
  let { nombre, email, password } = req.body;

  let userData = {
    nombre: nombre,
    email: email,
    esAdmin: false
  };

  User.register(userData, password, (err, usuario) => {
    if (err) {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/registrar');
    } else {
      req.flash('success_msg', 'Usuario' , (usuario.email).toUpperCase(),'registrado exitosamente');
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

router.post('/changepassword', (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    req.flash('error_msg', 'Las contraseñas no coinciden');
    return res.redirect('/changepassword')
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
            req.flash('error_msg', 'Error:' + error)
            res.redirect('/changepassword')
          })
      })
    })

})


//olvido password
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
          pass: 'kjiceexxxtfguhzj'
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

/* router.post('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'Su sesión ha finalizado correctamente');
  res.redirect('/pages/index');
}); */
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'Su sesión ha finalizado correctamente');
    res.redirect('/login');
  });
});

//PUT routes starts here
router.put('/edituser/:id', (req, res) => {
  let buscarId = { _id: req.params.id };

  User.updateOne(buscarId, {
    $set: {
      nombre: req.body.nombre,
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


