import express from 'express'
const router = express.Router()
import Product2 from '../models/products.js'


router.get('/productos', (req,res)=>{
    res.send('hola desde el router de productos')
})

router.post('/productos', async(req,res)=>{
    const productos = new Product2(req.body)
    await producto.save()
    res.status(200).json({message:"producto agregado"})
})



export default router