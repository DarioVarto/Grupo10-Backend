//De que se trata este sistema
<!-- //cambiar password 
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
}) -->