import express from 'express';
//Me permite a través de sus métodos ahorrar lineas de código

const app = express();
//Guardo los métodos de express en la constante app

import path from 'path';

import bodyParser from 'body-parser';
//Me permite tomar los datos del front y poder utilizarlos en el back (Formularios).En las últimas versiones viene instalado en el express, cambia la forma de llamarlo

import dotenv from 'dotenv'
//Guardar información sensible (Base, puertos, etc.)

import mongoose from 'mongoose';
//Me permite la conexión entre el back y el mongo

import flash from 'connect-flash'
//Mensajes flash (se muestran al usuario luego de realizar una acción)

import session from 'express-session';
//Me permite el trabajo de sesiones

import methodOverride from 'method-override'
//Es para modificar métodos heredados

import passport from 'passport';
//Me permite verificaciones de usuarios en sesiones

import LocalStrategy from 'passport-local'
//Extensión del passport. Permite tener crear sesiones de forma local con usuario y contraseña sin utilizar gmail, facebook para el inicio de sesión

import morgan from 'morgan'
//Muestra resultado de las peticiones en la consola
import { router } from './routes/users.js'
const userRoutes = router
/* import userRoutes from './routes/users.js' */
import productRoutes from './routes/products-detail.js'



import User from './models/usermodels.js'



dotenv.config({ path: './config.env' });

mongoose.connect(process.env.MONGO_GRUPO10, {

})
    .then(con => {
        console.log('La base de datos está conectada');
    })
    .catch(error => console.log('error'));

app.use(session({
    secret: 'El usuario esta conectado',
    resave: true,
    saveUninitialized: true //Permite navegar sin iniciar sesión
}));

app.use(passport.initialize());

app.use(passport.session()); //Guarda los datos de la sesión en un objeto denominado req.user

passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));//Método de comparación entre el dato ingresado y el que figura en la base de datos, en este caso el email

//funcion para que no te desloguee cuando navegas
app.use((req, res, next) => {
    res.locals.userName = req.user ? req.user.email : null;
    next();
});

//funcion numero del carrito
app.use((req, res, next) => {

    res.locals.productoCant = req.producto ? req.producto.cantidad : null;
    next();
});

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.use(methodOverride('_method'));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error'));
    res.locals.currentUser = req.usuario;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public')); //Conexión a carpeta public

app.use(userRoutes);
app.use(productRoutes);

app.get('/productos', (req, res) => {
    res.send("Hola desde productos")
})


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(flash())


dotenv.config({ path: './config.env' })






app.listen(process.env.PORT, () => {
    console.log('el servidor se está ejecutando')
})
