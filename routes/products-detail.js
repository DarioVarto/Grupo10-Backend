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
        nombre: 'Producto 3',
        descripcion: 'Descripción del producto 3',
        stock:20,
        precio: 200
      },
      {
        nombre: 'Producto 4',
        descripcion: 'Descripción del producto 4',
        stock:30,
        precio: 250
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
/*  cargarProductos();  */

router.get('/details', (req, res) => {
  let userName = req.user ? req.user.email : '';
  res.render('products/details', { userName: userName });
});

router.get('/prod', (req, res) => {
  Producto.find({})  //Busca y me trae todos los usuarios
    .then(productos => {
      res.render('./products/prod', { productos: productos }) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
    })
    .catch(error => {
      res.render('products/prod') //Renderizo la página de todos los usuarios
    })

})
router.post('/carrito/agregar', (req, res) => {
  const { nombre, descripcion, precio,stock } = req.body;
  
  if (!req.session.carrito) {
    req.session.carrito = [];
    req.session.total = 0; // Inicializa el total en 0 si el carrito no existe
  }
  
  const precioNum = parseFloat(precio); // Convierte el precio a un número
  const stockNum = parseInt(stock)
  req.session.carrito.push({ nombre, descripcion, precio: precioNum, stock:stockNum }); // Guarda el precio como un número en el carrito
  
  req.session.total += precioNum; // Actualiza la suma total
  
  res.redirect('/carrito');
});
router.get('/carrito', (req, res) => {
  const carrito = req.session.carrito || [];
  const total = req.session.total || 0; // Obtiene el total de la sesión o establece 0 si no existe
  
  res.render('products/carrito', { carrito, total }); // Pasa el total a la vista
});



export default router


