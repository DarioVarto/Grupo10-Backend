import express from 'express'
const router=express.Router()
import passport from 'passport'

router.get('/details', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/details', { userName: userName });
});

router.get('/carrito',(req,res)=>{
  let userName = req.user ? req.user.email : '';
  res.render('products/carrito', { userName: userName })
});



export default router


