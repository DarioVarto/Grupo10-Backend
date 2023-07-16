//creamos la coleccion con un modelo de articulo

// import mongoose from "mongoose";

// let productScheme=new mongoose.Schema({
        // id: Number,
        // title: String,
        // description: String,
        // images: String,
        // price: Number
// })

// module.exports=mongoose.model('Product',productScheme)

//Otra opcion

import {Schema, model} from 'mongoose'

const product2Schema = new Schema ({

        id: Number,
        title: String,
        description: String,
        images: String,
        price: Number

})

export default model('productos', product2Schema)
//productos es la coleccion, product2Schema es el modelo de los elementos de la coleccion productos