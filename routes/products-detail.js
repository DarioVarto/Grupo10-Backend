import express from 'express'
const router=express.Router()
import passport from 'passport'
import mongoose from 'mongoose'
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

router.get('/carrito', (req, res) => {
  const carrito = req.session.carrito || [];
  const total = req.session.total || 0; // Obtiene el total de la sesión o establece 0 si no existe
  
  res.render('products/carrito', { carrito, total }); // Pasa el total a la vista
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

router.get('/compraRealizada', async (req, res) => {
  const carrito = req.session.carrito || [];

  try {
    const productosCollection = mongoose.connection.collection('productos');

    // Actualizar el stock de cada producto en la colección
    for (const producto of carrito) {
      const { nombre, cantidad } = producto;

      await productosCollection.updateOne(
        { nombre: nombre },
        { $inc: { stock: -cantidad } } // Restar la cantidad del producto al stock
      );
    }

    // Vaciar el carrito y redirigir a la página principal o a otra página de éxito
    req.session.carrito = [];
    req.session.total = 0;
    
  } catch (error) {
    console.error('Error al actualizar el stock en la base de datos:', error);
    res.redirect('/carrito'); // Redirigir a la página del carrito en caso de error
  }
  res.redirect('/compraRealizada');
});


export default router


