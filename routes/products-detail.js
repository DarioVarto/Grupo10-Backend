import express from 'express'
const router=express.Router()
import passport from 'passport'

import Producto from '../models/products.js'

// Crear una función para cargar los productos en la base de datos
async function cargarProductos() {
  try {
    // Crear un arreglo de productos
    const productos = [
      {
        nombre: 'Producto 1',
        descripcion: 'Descripción del producto 1',
        precio: 10.99
      },
      {
        nombre: 'Producto 2',
        descripcion: 'Descripción del producto 2',
        precio: 19.99
      },
      // Agrega más productos aquí si es necesario
    ];

    // Insertar los productos en la base de datos
    await Producto.insertMany(productos);
    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los productos', error);
  } 
}

// Llamar a la función para cargar los productos
cargarProductos();

router.get('/details', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/details', { userName: userName });
});


router.get('/carrito', async (req, res) => {
  let userName = req.user ? req.user.email : '';
  try {
    // Obtener todos los productos del carrito
    const productos = await Producto.find();
    res.render('carrito', { productos },{ userName: userName });
  } catch (error) {
    console.error('Error al obtener los productos del carrito', error);
    res.sendStatus(500);
  }
});
router.post('/carrito/agregar', async (req, res) => {
  try {
    // Crear un nuevo producto con los datos recibidos
    const nuevoProducto = new Producto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio
    });

    // Guardar el nuevo producto en la base de datos
    await nuevoProducto.save();
    res.redirect('/carrito');
  } catch (error) {
    console.error('Error al agregar el producto al carrito', error);
    res.sendStatus(500);
  }
});



export default router


