import express from 'express'
const router=express.Router()


router.get('/',(req,res)=>{
  res.render('pages/index')
})


router.get('/details',(req,res)=>{
  res.render('products/details')
})


export default router


