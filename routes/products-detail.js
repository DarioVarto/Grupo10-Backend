import express from 'express'
const router=express.Router()
import passport from 'passport'
import mongoose from 'mongoose'
import Producto from '../models/products.js'
import {ensureAuthenticated } from './users.js'


import productos from './productos.js'

//Funcion cargar productos
async function cargarProductos(productos) {
  try {
    await Producto.insertMany(productos);

    console.log('Productos cargados en la base de datos.');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}
/* cargarProductos(productos) */

//cargarProductos(productos)

router.get('/shop-collections1', async (req, res) => {
  try {
    const productos = await obtenerProductosDesdeLaBaseDeDatos(); // Aquí obtienes tus productos de alguna manera

    // Renderizar la vista y pasar la variable `productos` en el objeto de contexto
    res.render('products/shop-collections1', { productos: productos });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.render('pages/error404');
  }
});

router.get('/details/:id', ensureAuthenticated, async (req, res) => {
  try {
    const productId = req.params.id;
    const producto = await Producto.findById(productId);

    if (producto) {
      res.render('products/details', { producto: producto, userName: req.user.email });
    } else {
      res.render('pages/error404');
    }
  } catch (error) {
    console.error('Error al obtener los detalles del producto:', error);
    res.render('pages/error404');
  }
});
router.post('/details/:id', ensureAuthenticated, async (req, res) => {
  const userName = req.user.email;
  try {
    const productId = req.params.id;
    const producto = await Producto.findById(productId);

    if (!producto) {
      // Si el producto no se encuentra en la base de datos, muestra un error o redirige a otra página.
      res.send('Producto no encontrado');
      return;
    }

    res.render('products/details', { producto, userName });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.redirect('/prod'); // Redirige a la página de productos en caso de error.
  }
});

router.get('/prod', ensureAuthenticated, async (req, res) => {
  const userName = req.user.email;
  try {
    const productos = await Producto.find({});
    res.render('./products/prod', { productos, userName });
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    res.render('products/prod', { userName });
  }
});


router.post('/carrito/agregar',ensureAuthenticated, (req, res) => {
  const { title, description, price, stock,images } = req.body;
  
  if (!req.session.carrito) {
    req.session.carrito = [];
    req.session.total = 0; // Establece el total en 0 si el carrito no existe
  }
  
  const precioNum = parseFloat(price);
  const stockNum = parseInt(stock);
  const producto = {
    title,
    description,
    images,
    price: precioNum,
    stock: stockNum - 1,
    cantidad: 1
  };
  
  req.session.carrito.push(producto);
  req.session.total += producto.price; // Suma solo el precio del producto agregado
  
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
      req.session.total += producto.price;
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
      req.session.total -= producto.price; // Resta solo el precio del producto restado
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
      const { title, cantidad } = producto;

      // Buscar el producto en la base de datos por su nombre
      const productoDB = await Producto.findOne({ title });

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
router.get('/allproducts', ensureAuthenticated, (req, res) => {
  Producto.find({})  //Busca y me trae todos los usuarios
    .then(productos => {
      res.render('products/allproducts', { productos: productos }) //Renderizo allusers y envío todos los usuarios que obtuve en el .find()
    })
    .catch(error => {
      res.render('products/allproducts') //Renderizo la página de todos los usuarios
    })

})
router.get('/editProducts/:id', (req, res) => {
  let buscarId = { _id: req.params.id };
  Producto.findOne(buscarId)
    .then(producto => {
      res.render('./products/editProducts', { producto: producto }); // Asegúrate de pasar el objeto 'producto' como variable
    })
    .catch(error => {
      console.log(error);
      req.flash('error_msg', 'Error:' + error);
      res.redirect('products/editProducts');
    });
});
router.put('/editProducts/:id', async (req, res) => {
  let buscarId = { _id: req.params.id };

    Producto.updateOne(buscarId, {
      $set: {
        title: req.body.title,
      stock: req.body.stock,
      price: req.body.price,
      }
    })
    .then(() => {
      req.flash('success_msg', 'Los datos se modificaron exitosamente');
      res.redirect('/allproducts');
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/products/allproducts');
    })
});
router.delete('/delete/producto/:id', (req, res) => {
  let buscarId = { _id: req.params._id };
  Producto.deleteOne(buscarId)
    .then(() => {
      req.flash('success_msg', 'Producto eliminado exitosamente');
      res.redirect('/allproducts');
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: ' + err);
      res.redirect('/allproducts');
    })
});





export default router  