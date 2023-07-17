import express from 'express'
const router=express.Router()
import passport from 'passport'
import mongoose from 'mongoose'
import Producto from '../models/products.js'
import {ensureAuthenticated } from './users.js'






// Crear una función para cargar los productos en la base de datos
 async function cargarProductos() {
  try {
    // Crear un arreglo de productos
    const productos = [
      {
        nombre: 'Producto 1',
        descripcion: 'Descripción del producto 3',
        stock:20,
        precio: 100
      },
      {
        nombre: 'Producto 2',
        descripcion: 'Descripción del producto 3',
        stock:20,
        precio: 150
      },
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
//comentar la funcion para que no siga cargando productos todo el tiempo
// cargarProductos(); 

router.get('/details', ensureAuthenticated, (req, res) => {
  const userName = req.user.email;
  res.render('products/details', { userName: userName });
}); 

/* router.get('/prod', ensureAuthenticated, (req, res) => {
  const userNameValue = req.user.email;
  Producto.find({})  //Busca y me trae todos los usuarios
    .then(productos => {
      res.render('./products/prod', { productos: productos }, { userName: userNameValue }) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
    })
    .catch(error => {
      res.render('products/prod', { userName: userName }) //Renderizo la página de todos los usuarios
    })

}) */
router.get('/prod', ensureAuthenticated, (req, res) => {
  const userName = req.user.email;
  Producto.find({})
    .then((productos) => {
      res.render('./products/prod', { productos, userName });
    })
    .catch((error) => {
      res.render('products/prod', { userName });
    });
});


router.post('/carrito/agregar',ensureAuthenticated, (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  
  if (!req.session.carrito) {
    req.session.carrito = [];
    req.session.total = 0; // Establece el total en 0 si el carrito no existe
  }
  
  const precioNum = parseFloat(precio);
  const stockNum = parseInt(stock);
  const producto = {
    nombre,
    descripcion,
    precio: precioNum,
    stock: stockNum - 1,
    cantidad: 1
  };
  
  req.session.carrito.push(producto);
  req.session.total += producto.precio; // Suma solo el precio del producto agregado
  
  res.redirect('/carrito');
});

router.post('/carrito/sumar/:index', (req, res) => {
  const index = req.params.index;
  
  if (req.session.carrito && req.session.carrito.length > index) {
    const producto = req.session.carrito[index];
    
    if (producto.stock > 0) {
      if (!producto.cantidad) {
        producto.cantidad = 1;
      }
      producto.cantidad += 1;
      producto.stock -= 1;
      req.session.total += producto.precio;
    }
  }
  
  res.redirect('/carrito');
});

router.post('/carrito/restar/:index', (req, res) => {
  const index = req.params.index;
  
  if (req.session.carrito && req.session.carrito.length > index) {
    const producto = req.session.carrito[index];
    
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      producto.stock += 1;
      req.session.total -= producto.precio; // Resta solo el precio del producto restado
    } else {
      req.session.carrito.splice(index, 1);
    }
  }
  
  res.redirect('/carrito');
});

router.get('/carrito', ensureAuthenticated, (req, res) => {
  const userName = req.user.email;
  const carrito = req.session.carrito || [];
  const total = req.session.total || 0; // Obtiene el total de la sesión o establece 0 si no existe
  
  res.render('products/carrito', { carrito, total, userName }); // Pasa el total a la vista
});
router.post('/carrito/eliminar/:index', (req, res) => {
  const index = req.params.index;
  
  if (req.session.carrito && req.session.carrito.length > index) {
    const producto = req.session.carrito[index];
    req.session.total -= producto.precio * (producto.cantidad || 1);
    req.session.carrito.splice(index, 1);
  }
  
  res.redirect('/carrito');
});

// ruta compra realizada
router.get('/compraRealizada', async (req, res) => {
  const userName = req.user.email;
  const carrito = req.session.carrito || [];

  try {
    // Actualizar el stock de cada producto en la colección
    for (const producto of carrito) {
      const { nombre, cantidad } = producto;

      // Buscar el producto en la base de datos por su nombre
      const productoDB = await Producto.findOne({ nombre });

      // Restar la cantidad del producto al stock
      productoDB.stock -= cantidad;

      // Guardar el producto actualizado en la base de datos
      await productoDB.save();
    }

    // Vaciar el carrito y renderizar la vista de compra realizada
    req.session.carrito = [];
    req.session.total = 0;
    req.flash('success_msg', 'Compra realizada');
    res.render('pages/compraRealizada', { userName:userName });
  } catch (error) {
    console.error('Error al actualizar el stock en la base de datos:', error);
    res.redirect('/carrito'); // Redirigir a la página del carrito en caso de error
  }
});


//renderizado estatico de productos top-sale hasta completar el agregado de productos con funcion cargarProductos()
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

export default router


