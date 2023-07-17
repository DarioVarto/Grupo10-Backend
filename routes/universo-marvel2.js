import express from 'express'
const router=express.Router()


router.get('/universo-marvel2', (req, res) => {
  res.render('universo/universo-marvel2');
});


export default router
