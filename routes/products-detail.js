import express from 'express'
const router=express.Router()


router.get('/',(req,res)=>{
  res.render('pages/index')
})


router.get('/details',(req,res)=>{
  res.render('products/details')
})


router.get('/carrito',(req,res)=>{
  res.render('products/carrito')
})



export default router


