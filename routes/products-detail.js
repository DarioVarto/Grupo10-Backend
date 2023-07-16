import express from 'express'
const router=express.Router()
import passport from 'passport'

router.get('/top-sale-1', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/top-sale-1', { userName: userName });
});
router.get('/top-sale-2', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/top-sale-2', { userName: userName });
});
router.get('/top-sale-3', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/top-sale-3', { userName: userName });
});

router.get('/carrito',(req,res)=>{
  let userName = req.user ? req.user.email : '';
  res.render('products/carrito', { userName: userName })
});

export default router


