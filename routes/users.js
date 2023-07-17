import express from 'express'
const router = express.Router()
import passport from "passport"
import crypto from 'crypto'
import async from 'async'  //Funciones asincrónicas que deben realizare en orden. El resultado de una función lo retoma la próxima función
import nodemailer from 'nodemailer'
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken' //Extensión para generar token
import User from '../models/usermodels.js'
import Producto from '../models/products.js'


//Configuro passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
//Asigno email a userName para luego poder requerirla en las rutas
  function (email, password, done) {
    userName = email;
    User.findOne({ email: email }, function (err, usuario) {
      if (err) { return done(err); }
      if (!usuario) { return done(null, false); };
      if (!usuario.verifyPassword(password)) { return done(null, false); }
      return done(null, usuario);
    });
  return userName}
));

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
      let userName = usuario.email;
      req.login(usuario, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('success_msg', '🟢🟢🟢BIENVENIDO', (usuario.nombre).toUpperCase(), 'USTED ES EL ADMINISTRADOR✅✅✅')
        return res.render('admin/dashboard', { userName: userName });
      });
      
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

//Defino función ensureAuthenticated para pedir a los usuarios que se logueen para poder navegar

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.usuario = req.user;

    return next();
  }
  req.flash('success_msg', 'Por favor, ingresar para continuar navegando')
  res.redirect('/login');
}

//Peticiones get

router.get('/', (req, res) => {
  const userName = res.locals.userName;
  res.render('pages/index', { userName: userName });
})

router.get('/contacto', ensureAuthenticated, (req, res) => { //link contacto footer
  const userName = res.locals.userName;
  if (userName) {
    res.render('pages/contacto', { userName: userName })
  }
  else {
    res.render('pages/contacto')
  }
})

router.get('/nosotros', ensureAuthenticated, (req, res) => {
  const userName = res.locals.userName;
  res.render('pages/nosotros', { userName: userName });
});

router.get('/historia', ensureAuthenticated, (req, res) => { //link historia footer
  const userName = res.locals.userName;
  res.render('pages/historia', { userName: userName })
})

router.get('/soporte', ensureAuthenticated, (req, res) => { //link soporte footer
  const userName = res.locals.userName;
  res.render('pages/soporte', { userName: userName })
})

router.get('/informacion', ensureAuthenticated, (req, res) => { //link informacion footer
  const userName = res.locals.userName;
  res.render('pages/informacion', { userName: userName })
})
router.get('/privacidad', ensureAuthenticated, (req, res) => { //link privacidad footer
  const userName = res.locals.userName;
  res.render('pages/privacidad', { userName: userName })
})
router.get('/terminos', ensureAuthenticated, (req, res) => { //link terminos footer
  const userName = res.locals.userName;
  res.render('pages/terminos', { userName: userName })
})

router.get('/edit', ensureAuthenticated, (req, res) => {
  const userName = res.locals.userName;
  res.render('users/edit', { userName: userName })
})

router.get('/registrar', (req, res) => {
  res.render('./users/registrar');
});

router.get('/alluser', ensureAuthenticated, (req, res) => {
  User.find({})  //Busca y me trae todos los usuarios
    .then(usuarios => {
      res.render('./users/alluser', { usuarios: usuarios }) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
    })
    .catch(error => {
      res.render('users/alluser') //Renderizo la página de todos los usuarios
    })

})


router.get('/dashboard', ensureAuthenticated, (req, res) => {
  const userName = res.locals.userName;
  User.find({})
    .then(usuarios => {
      res.render('admin/dashboard', { usuarios: usuarios, userName: userName });
    })
    .catch(error => {
      res.render('/admin/dashboard');
    });
});


router.get('/edituser/:id', (req, res) => {
  let buscarId = { _id: req.params.id }
  User.findOne(buscarId)

    .then(usuario => {
      res.render('./users/edituser', { usuario: usuario })
    })
    .catch(error => {
      console.log(error)
      res.flash('error_msg', 'Error:' + error) /
      res.redirect('users/allusers') 
    })
})

router.get('/login', (req, res) => {
  res.render('users/login')
});


router.get('/olvido', (req, res) => {
  res.render('users/olvido')
})




router.get(('/logout', (req, res) => {  //No es necesario crear un archivo logout, es una petición del cierre de sesión
  
  req.logOut(); //Método propio de nodejs para cerrar sesión
  res.flash('success_msg', 'Su sesión ha finalizado correctamente') //Mensaje para el usuario que se deslogueo
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
      req.flash('success_msg', 'Usuario', (usuario.email).toUpperCase(), 'registrado exitosamente');
      res.redirect('/login');
    }

  });

});


//Función para generar token
function generarToken(usuarioId) {
  // Clave secreta para firmar el token (puedes cambiarla por una más segura)
  const claveSecreta = 'secretKey';

  // Datos que se incluirán en el token (pueden ser cualquier información relevante del usuario)
  const datosUsuario = {
    id: usuarioId,
    // Aquí puedes agregar más datos, como el nombre de usuario, rol, etc.
  };

  // Generar el token con los datos y la clave secreta
  const token = jwt.sign(datosUsuario, claveSecreta, { expiresIn: '30m' });

  return token;
}
router.get('/changepassword', ensureAuthenticated, (req, res) => {
  res.render('users/changepassword');
});
router.post('/changepassword', ensureAuthenticated, (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    req.flash('error_msg', "Passwords don't match. Type again!");
    return res.redirect('/password/change');
  }

  User.findOne({ email: req.user.email })
    .then(usuario => {
      usuario.setPassword(req.body.password, error => {
        if (error) {
          req.flash('error_msg', 'Error al modificar la contraseña: ' + error);
          return res.redirect('/changepassword');
        }

        usuario.save()
          .then(usuario => {
            req.flash('success_msg', 'La contraseña se modificó exitosamente');
            res.redirect('/login');
          })
          .catch(error => {
            req.flash('error_msg', 'Error al guardar la contraseña: ' + error);
            res.redirect('/changepassword');
          });
      });
    })
    .catch(error => {
      req.flash('error_msg', 'Error al buscar el usuario: ' + error);
      res.redirect('/changepassword');
    });
});


router.get('/changepassword/:token', (req, res) => {
  const token = req.params.token;

  // Verificar el token y su validez
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      // El token no es válido o ha expirado
      console.error('Error al verificar el token:', err);
      req.flash('error_msg', 'El enlace para cambiar la contraseña es inválido o ha expirado.');
      return res.redirect('/olvido'); // Redirigir a la página de olvido con un mensaje de error
    }

    // El token es válido, renderizar la vista 'user/changepassword' y pasar el token como variable para usarlo en la vista.
    res.render('user/changepassword', { token: token });
  });
});
router.post('/changepassword/:token', ensureAuthenticated, (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword; // Obtener el valor del campo newPassword del formulario
  const confirmPassword = req.body.confirmPassword; // Obtener el valor del campo confirmPassword del formulario

  if (newPassword !== confirmPassword) {
    req.flash('error_msg', 'Las contraseñas no coinciden');
    return res.redirect('/changepassword/' + token); // Redirigimos al formulario de cambio de contraseña con el token en la URL
  }

  User.findOne({ email: req.user.email })
    .then(usuario => {
      usuario.setPassword(newPassword, error => {
        if (error) {
          req.flash('error_msg', 'Error al modificar la contraseña: ' + error);
          return res.redirect('/changepassword/' + token); // Redirigimos al formulario de cambio de contraseña con el token en la URL
        }

        usuario.save()
          .then(usuario => {
            req.flash('success_msg', 'La contraseña se modificó exitosamente');
            res.redirect('/login');
          })
          .catch(error => {
            req.flash('error_msg', 'Error al guardar la contraseña: ' + error);
            res.redirect('/changepassword/' + token); // Redirigimos al formulario de cambio de contraseña con el token en la URL
          });
      });
    })
    .catch(error => {
      req.flash('error_msg', 'Error al buscar el usuario: ' + error);
      res.redirect('/changepassword/' + token); // Redirigimos al formulario de cambio de contraseña con el token en la URL
    });
});


//olvido password
router.post('/olvido', async (req, res) => {
  try {
    const token = await new Promise((resolve, reject) => {
      crypto.randomBytes(20, (error, buf) => {
        if (error) {
          reject(error);
        } else {
          const token = buf.toString('hex');
          resolve(token);
        }
      });
    });

    const usuario = await User.findOne({ email: req.body.email });
    if (!usuario) {
      // El usuario no existe, redirigir a la página de olvido
      return res.redirect('/olvido');
    }

    usuario.resetPasswordToken = token;
    usuario.resetPasswordExpired = Date.now() + 1800000;
    await usuario.save();

    const resetLink = `http://localhost:3030/changepassword/${token}`; // Cambia "tuapp.com" por el dominio real de tu aplicación

    let enviar = nodemailer.createTransport({
      service: 'Hotmail',
      auth: {
        user: 'grupo10-utn@hotmail.com',
        pass: 'Grupo10@utn'
      }
    });

    let mailOptions = {
      to: usuario.email,
      from: 'grupo10-utn@hotmail.com',
      subject: 'Recuperar contraseña',
      text: `Para recuperar tu contraseña debes ingresar a: ${resetLink}\nRecuerda que debes hacerlo dentro de los próximos 30 minutos`
    };

    await enviar.sendMail(mailOptions);

    // Se enviaron las instrucciones
    res.redirect('/login');
  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    // Redirigir a la página de olvido en caso de error
    res.redirect('/olvido');
  }
});

router.post('/logout', (req, res) => {
  req.logout(function (err) {
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



export { router, ensureAuthenticated }; //Exporto router y la función para solicitar logueo para navegar


